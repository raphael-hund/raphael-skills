let meta = #{
    name: "website-plan",
    description: "Full website planning pipeline: research, SEO, IA gate, copy, specs, design gate, roadmap — plan only, multi-agent, ultracode",
    when_to_use: "User runs /website-plan or wants a complete website content+SEO+layout plan with adversarial multi-agent workflow",
    phases: [
        #{ title: "Intake", detail: "Normalize mission and write meta plan skeleton" },
        #{ title: "Research", detail: "Company, social, GBP, live site, competitors" },
        #{ title: "Assets", detail: "Inventory and gaps" },
        #{ title: "SEO", detail: "Audit and full SEO plan with AEO" },
        #{ title: "IA-Gate", detail: "Three sitemap/section variants — await user" },
        #{ title: "Copy", detail: "Final copy plus humanizer pass" },
        #{ title: "Specs", detail: "Per-section layout and component specs" },
        #{ title: "Design-Research", detail: "Local captures, manifest and G-REF" },
        #{ title: "Design-Gate", detail: "Three prompts and comparison heroes — await user" },
        #{ title: "Close", detail: "Design system plan, component map, roadmap, DoD" },
    ],
};

// --- args ---
let live_url = "";
let repo_stand = "IGNORIEREN";
let out_dir = "website-plan";
let firma = "";
let socials = "";
let asset_dirs = "";
let overrides = "";
let extra = "";
if args != () {
    if args.live_url != () { live_url = args.live_url; }
    if args.repo_stand != () { repo_stand = args.repo_stand; }
    if args.out_dir != () { out_dir = args.out_dir; }
    if args.firma != () { firma = args.firma; }
    if args.socials != () { socials = json_encode(args.socials); }
    if args.asset_dirs != () { asset_dirs = json_encode(args.asset_dirs); }
    if args.overrides != () { overrides = args.overrides; }
    if args.extra != () { extra = args.extra; }
}
if firma == "" && live_url == "" {
    pause("verification", "Pass args.firma and/or args.live_url (and ideally out_dir, repo_stand).");
}

let ultra = "Long-horizon ultracode session. Human may step away between gates. Do not stop early. Produce complete artifacts for your role. No code implementation — planning deliverables only. Spawn no nested agents; only the workflow starts agents. Write German markdown files under the given out_dir using tools.";
let mission = "FIRMA: " + firma + " | LIVE_URL: " + live_url + " | REPO_STAND: " + repo_stand + " | OUT_DIR: " + out_dir + " | SOCIALS: " + socials + " | ASSET_DIRS: " + asset_dirs + " | OVERRIDES: " + overrides + " | EXTRA: " + extra;

let text_schema = #{
    "type": "object",
    "required": ["summary", "paths_written"],
    "properties": #{
        "summary": #{ "type": "string" },
        "paths_written": #{ "type": "array", "items": #{ "type": "string" } },
        "open_questions": #{ "type": "array", "items": #{ "type": "string" } },
    },
};

let variants_schema = #{
    "type": "object",
    "required": ["recommendation", "options"],
    "properties": #{
        "recommendation": #{ "type": "string" },
        "options": #{
            "type": "array",
            "minItems": 3,
            "maxItems": 3,
            "items": #{
                "type": "object",
                "required": ["id", "title", "meaning", "tradeoff"],
                "properties": #{
                    "id": #{ "type": "string" },
                    "title": #{ "type": "string" },
                    "meaning": #{ "type": "string" },
                    "tradeoff": #{ "type": "string" },
                },
            },
        },
        "detail_path": #{ "type": "string" },
    },
};

let design_schema = #{
    "type": "object",
    "required": ["recommendation", "options", "g_ref_pass", "mockups_ready"],
    "properties": #{
        "recommendation": #{ "type": "string" },
        "options": variants_schema.properties.options,
        "g_ref_pass": #{ "type": "boolean" },
        "mockups_ready": #{ "type": "boolean" },
        "prompt_path": #{ "type": "string" },
        "reference_manifest_path": #{ "type": "string" },
        "generated_paths": #{ "type": "array", "items": #{ "type": "string" } },
    },
};
let verify_schema = #{
    "type": "object",
    "required": ["exit_code", "stdout"],
    "properties": #{
        "exit_code": #{ "type": "integer" },
        "stdout": #{ "type": "string" },
    },
};
let choice_schema = #{
    "type": "object",
    "required": ["choice", "mix_details"],
    "properties": #{
        "choice": #{ "type": "string", "enum": ["A", "B", "C", "MIX"] },
        "mix_details": #{ "type": "string", "pattern": "^[A-Za-z0-9ÄÖÜäöüß ,.;:/()+&-]{0,196}$" },
    },
};

// ========== INTAKE ==========
phase("Intake");
let p_meta = ultra + "\nMISSION: " + mission + "\nROLE: Meta-planner.\nWrite " + out_dir + "/00-meta-plan.md with: sources (live url, repo mode), deliverable list, phase plan, sub-agent role waves (roles only, no fixed worker type names), DoD checklist from website-plan skill. Also write " + out_dir + "/11-open-questions.md skeleton.\nReturn summary + paths_written.";
let r_meta = agent(p_meta, #{ label: "meta-plan", capability_mode: "read-write", output_schema: text_schema });
if r_meta == () || !r_meta.success { log("meta-plan failed — continuing with remaining phases"); }

// ========== RESEARCH ==========
phase("Research");
let research_jobs = [];
let p_r1 = ultra + "\nMISSION: " + mission + "\nROLE: Company research lead.\nResearch who the company is via web search. Use live site only as one source if present. Build proof inventory (only claimable facts).\nWrite " + out_dir + "/01-firma-dossier.md.\nReturn summary + paths_written.";
research_jobs.push(#{ prompt: p_r1, label: "research-company", capability_mode: "all", output_schema: text_schema });
let p_r2 = ultra + "\nMISSION: " + mission + "\nROLE: Social/GBP/Maps reach researcher.\nCheck Instagram, Facebook, LinkedIn, YouTube, TikTok, X, Google Business Profile signals, Maps presence as available. Note missing channels.\nAppend a section to " + out_dir + "/01-firma-dossier.md named Online-Praesenz OR write " + out_dir + "/01b-online-praesenz.md if dossier missing.\nReturn summary + paths_written.";
research_jobs.push(#{ prompt: p_r2, label: "research-reach", capability_mode: "all", output_schema: text_schema });
let p_r3 = ultra + "\nMISSION: " + mission + "\nROLE: Adversarial research critic (different angle from company researcher).\nAttack gaps, weak proof, missing local signals, inflated claims risk. Write findings into " + out_dir + "/01-firma-dossier.md under ## Gauntlet-Kritik or " + out_dir + "/01c-research-critic.md.\nReturn summary + paths_written.";
research_jobs.push(#{ prompt: p_r3, label: "research-critic", capability_mode: "read-write", output_schema: text_schema });
let research_results = parallel(research_jobs);
log("research panel done");

// ========== ASSETS ==========
phase("Assets");
let p_assets = ultra + "\nMISSION: " + mission + "\nROLE: Asset inventory.\nScan asset_dirs and any project media. For each useful image: description + alt-text suggestion + use cases. Wish-list sections first (want before have), then gap matrix.\nWrite " + out_dir + "/02-asset-inventar.md and " + out_dir + "/02b-asset-gaps.md.\nWeb images/logos/icons may be saved for planning; license later.\nReturn summary + paths_written.";
let r_assets = agent(p_assets, #{ label: "assets", capability_mode: "all", output_schema: text_schema });
if r_assets == () || !r_assets.success { log("assets agent failed"); }

// ========== SEO ==========
phase("SEO");
let seo_jobs = [];
let p_seo_d = ultra + "\nMISSION: " + mission + "\nROLE: SEO plan author.\nIf live_url present: write " + out_dir + "/03-seo-audit.md.\nAlways write full " + out_dir + "/04-seo-plan.md following website-plan SEO schema: keyword clusters (use SEO data API if available), keyword-URL map, technical, on-page per URL, internal links, local (or N/A), E-E-A-T, schema, CWV targets, AEO/AI-search MANDATORY, analytics, roadmap P0/P1/P2, forbidden tactics.\nReturn summary + paths_written.";
seo_jobs.push(#{ prompt: p_seo_d, label: "seo-draft", capability_mode: "all", output_schema: text_schema });
let p_seo_c = ultra + "\nMISSION: " + mission + "\nROLE: SEO critic (adversarial).\nAfter draft exists (or in parallel on same mission), attack cannibalization, intent mismatch, weak AEO, doorway risk, missing measurement.\nWrite " + out_dir + "/04b-seo-critic.md with concrete fixes the parent should merge.\nReturn summary + paths_written.";
seo_jobs.push(#{ prompt: p_seo_c, label: "seo-critic", capability_mode: "all", output_schema: text_schema });
let p_growth = ultra + "\nMISSION: " + mission + "\nROLE: Growth/conversion critic.\nCheck whether SEO plan kills conversion or misses primary CTA model. Write " + out_dir + "/04c-growth-critic.md.\nReturn summary + paths_written.";
seo_jobs.push(#{ prompt: p_growth, label: "growth-critic", capability_mode: "read-write", output_schema: text_schema });
let seo_results = parallel(seo_jobs);
log("seo panel done");

// ========== IA GATE ==========
phase("IA-Gate");
let p_ia = ultra + "\nMISSION: " + mission + "\nROLE: IA variant generator.\nRead dossier + SEO plan if present. Produce THREE genuinely different sitemap+core-section options (A/B/C) — not cosmetic rewrites. Each: pages list, key sections per money page, tradeoff.\nWrite full options to " + out_dir + "/05-ia-variants.md.\nReturn structured options array with id A/B/C, title, meaning, tradeoff, recommendation letter, detail_path.";
let r_ia = agent(p_ia, #{ label: "ia-variants", capability_mode: "all", output_schema: variants_schema });
let ia_msg = "G-IA: Waehle Sitemap/Sektionen A, B oder C (siehe " + out_dir + "/05-ia-variants.md). Danach Workflow fortsetzen.";
if r_ia != () && r_ia.success && r_ia.output != () {
    ia_msg = "G-IA STOP. Empfehlung: " + r_ia.output.recommendation + ". Drei Varianten in " + out_dir + "/05-ia-variants.md. Antworte mit A, B, C oder Mix — dann /workflow resume.";
}
await_user("user", ia_msg);

let p_ia_lock = ultra + "\nMISSION: " + mission + "\nROLE: IA lock writer.\nUser has chosen sitemap/sections (see conversation / prior gate). Write final " + out_dir + "/05-sitemap-ia.md and " + out_dir + "/05b-copy-style.md (copy archetype pick + 3-line rationale, learn-not-clone).\nReturn summary + paths_written.";
let r_ia_lock = agent(p_ia_lock, #{ label: "ia-lock", capability_mode: "all", output_schema: text_schema });
if r_ia_lock == () || !r_ia_lock.success { log("ia-lock failed"); }

// ========== COPY ==========
phase("Copy");
let p_copy = ultra + "\nMISSION: " + mission + "\nROLE: Copywriter.\nUsing locked sitemap, write complete German UI copy for every priority page/section into " + out_dir + "/06-seiten/<slug>.md (create files). Headlines, body, CTAs, microcopy. Claims only from proof inventory. No lorem.\nReturn summary + paths_written.";
let r_copy = agent(p_copy, #{ label: "copy-draft", capability_mode: "all", output_schema: text_schema });
let p_hum = ultra + "\nMISSION: " + mission + "\nROLE: Humanizer / anti-slop editor.\nRead the completed copy draft. Rewrite all page copy files under " + out_dir + "/06-seiten/ to remove AI tells. Keep facts. Mark READY_FOR_VERIFY; FINAL only after critic and validator pass.\nReturn summary + paths_written.";
let r_hum = agent(p_hum, #{ label: "copy-humanizer", capability_mode: "all", output_schema: text_schema });
log("copy panel done");

// ========== SPECS ==========
phase("Specs");
let p_specs = ultra + "\nMISSION: " + mission + "\nROLE: Section-spec author.\nFor every visible section under " + out_dir + "/06-seiten/, add its own complete spec: purpose, exact copy, desktop/mobile, components/states, motion trigger/element/initial/final/duration/easing/stagger/reduced-motion, SEO and mockup fields. No global catch-all and no 'as above'. Write route-manifest.tsv with one owner per indexable route.\nReturn summary + paths_written.";
let r_specs = agent(p_specs, #{ label: "section-specs", capability_mode: "all", output_schema: text_schema });
if r_specs == () || !r_specs.success { log("specs failed"); }

// ========== DESIGN RESEARCH + GATE ==========
phase("Design-Research");
let p_ref = ultra + "\nMISSION: " + mission + "\nROLE: Design-reference researcher/writer.\nRead the website-plan reference design-inspiration.md. Define 3 structurally distinct hypotheses. Use repo/brand/assets first. Use Mobbin only if actually exposed; otherwise real sites via browser/web and document Mobbin unavailable. Capture 2-3 relevant regions per direction to " + out_dir + "/09-mockups/references/. Write " + out_dir + "/09-mockups/reference-manifest.md with source URL, date, viewport, region, pattern_take, do_not_copy, 0/1/2 suitability and one model role. Run and document binary G-REF. URL lists do not count.\nReturn summary + paths_written.";
let r_ref = agent(p_ref, #{ label: "design-reference-research", capability_mode: "all", output_schema: text_schema });

phase("Design-Gate");
let p_des = ultra + "\nMISSION: " + mission + "\nROLE: Design direction + GPT prompt lead.\nRead the manifest and design-inspiration.md. Repair any G-REF failure before continuing. Write THREE structurally distinct directions to " + out_dir + "/09-mockups/briefs.md and THREE standalone prompts to " + out_dir + "/09-mockups/gpt-prompts.md. Each prompt maps 2-3 local captures in exact attachment order and requests the same hero viewport and FINAL copy. If an image tool exists, actually attach captures and generate one checked A/B/C hero under generated/. Set mockups_ready true only when all three exist and pass source-logo/copy/fake-proof/copying checks. Return status and paths.";
let r_des = agent(p_des, #{ label: "design-variants", capability_mode: "all", output_schema: design_schema });
if r_des == () || !r_des.success || r_des.output == () || !r_des.output.g_ref_pass {
    pause("verification", "G-REF FAIL: captures, manifest or prompt mapping incomplete. Repair before G-DESIGN.");
}
let des_msg = "G-DESIGN: Waehle Designrichtung A/B/C und arbeite Mockups mit (siehe " + out_dir + "/09-mockups/). Dann resume.";
if !r_des.output.mockups_ready {
    await_user("user", "G-REF PASS, AWAITING_MOCKUPS. Nutze die drei eigenstaendigen Prompts in " + out_dir + "/09-mockups/gpt-prompts.md mit den exakt gemappten lokalen Captures. Erzeuge je einen Hero; erst danach A/B/C waehlen und /workflow resume.");
}
let p_verify_design = "Read-only verifier. Run exactly: python3 /root/raphael-skills/skills/eigene/website-plan/scripts/validate-design-gate.py " + out_dir + ". Return real exit_code and complete stdout. Do not repair.";
let r_verify_design = agent(p_verify_design, #{ label: "design-gate-preflight", capability_mode: "read-only", output_schema: verify_schema });
if r_verify_design == () || !r_verify_design.success || r_verify_design.output == () || r_verify_design.output.exit_code != 0 {
    pause("verification", "G-DESIGN BLOCKED: deterministic design preflight failed. Repair artifacts, then resume.");
}
des_msg = "G-DESIGN STOP. Deterministic preflight PASS. Empfehlung: " + r_des.output.recommendation + ". Antworte mit A, B, C oder MIX:<Beschreibung> — dann /workflow resume.";
await_user("user", des_msg);
let p_choice = "Read the user's immediately preceding G-DESIGN answer. Return choice A, B, C or MIX. For MIX, copy a concrete description into mix_details; otherwise mix_details is empty. Do not infer a choice from earlier recommendations.";
let r_choice = agent(p_choice, #{ label: "design-choice-capture", capability_mode: "read-only", output_schema: choice_schema });
if r_choice == () || !r_choice.success || r_choice.output == () {
    pause("verification", "G-DESIGN BLOCKED: no parseable user choice.");
}
let design_choice = r_choice.output.choice;
if design_choice == "MIX" {
    if r_choice.output.mix_details.len() < 3 { pause("verification", "G-DESIGN BLOCKED: MIX needs details."); }
    design_choice = "MIX:" + r_choice.output.mix_details;
}
let p_choice_verify = "Read-only verifier. Run exactly: python3 /root/raphael-skills/skills/eigene/website-plan/scripts/validate-design-gate.py " + out_dir + " --choice '" + design_choice + "'. Return real exit_code and stdout.";
let r_choice_verify = agent(p_choice_verify, #{ label: "design-choice-preflight", capability_mode: "read-only", output_schema: verify_schema });
if r_choice_verify == () || !r_choice_verify.success || r_choice_verify.output == () || r_choice_verify.output.exit_code != 0 {
    pause("verification", "G-DESIGN BLOCKED: user choice preflight failed.");
}

// ========== CLOSE ==========
phase("Close");
let close_jobs = [];
let p_ds = ultra + "\nMISSION: " + mission + "\nROLE: Design-system planner.\nAfter user design choice, write " + out_dir + "/07-design-system-plan.md (colors, Adobe Fonts preference, type, spacing ideas, button states/hover vision, header, motion, icons). Vision over fake px dogma.\nReturn summary + paths_written.";
close_jobs.push(#{ prompt: p_ds, label: "design-system", capability_mode: "all", output_schema: text_schema });
let p_cm = ultra + "\nMISSION: " + mission + "\nROLE: Component mapper.\nIf repo MITNUTZEN, scan existing React components. Map sections to components; note library inspiration without dump. Write " + out_dir + "/08-component-map.md.\nReturn summary + paths_written.";
close_jobs.push(#{ prompt: p_cm, label: "component-map", capability_mode: "all", output_schema: text_schema });
let p_road = ultra + "\nMISSION: " + mission + "\nROLE: Roadmap + gates log.\nWrite " + out_dir + "/10-roadmap.md and " + out_dir + "/12-verbote-und-gates.md. Include exact machine-readable line G-DESIGN_CHOICE: " + design_choice + ". Update open questions.\nReturn summary + paths_written.";
close_jobs.push(#{ prompt: p_road, label: "roadmap", capability_mode: "all", output_schema: text_schema });
let close_results = parallel(close_jobs);

// Final critic
let p_final = ultra + "\nMISSION: " + mission + "\nROLE: Final adversarial critic on the whole plan package under " + out_dir + ".\nCheck DoD, G-REF, manifest, 3 prompts/heroes, G-DESIGN choice, route/spec/mockup coverage. Write " + out_dir + "/13-final-critic.md. Summary MUST start VERDICT: PASS or VERDICT: FAIL.\nReturn summary + paths_written.";
let r_final = agent(p_final, #{ label: "final-critic", capability_mode: "all", output_schema: text_schema });
if r_final == () || !r_final.success || r_final.output == () || !r_final.output.summary.starts_with("VERDICT: PASS") {
    pause("verification", "RUN_COMPLETE but BLOCKED: Final Critic did not PASS. Repair listed failures; PLAN_VERIFIED remains false.");
}
pause("verification", "RUN_COMPLETE. Run python3 /root/raphael-skills/skills/eigene/website-plan/scripts/validate-plan.py " + out_dir + ". PLAN_VERIFIED only on exit 0.");
