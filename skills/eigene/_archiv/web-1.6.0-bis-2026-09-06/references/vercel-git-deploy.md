# Vercel + Git für Kunden-Sites

Lade diese Datei bei Launch, Git-Anbindung oder paralleler Arbeit (Raphael + Konsti).

## Remotes

Kunden-Repos (nicht Wilhelm, nicht Sorglos):

| Remote | Ziel |
|---|---|
| `origin` | `MAKE-Marketing-GmbH/<slug>` — Wahrheit, Vercel, Konsti |
| `personal` | `raphael-hund/<spiegel>` — privater Spiegel |

Wilhelm, Sorglos, MAKE-Eigenmarke und Infra bleiben nur auf `raphael-hund`.

Nach Squash auf `main` und Push auf `origin`: der Hook `/root/tools/git-personal-mirror.sh` pusht `main` nach `personal`. Hook-Pfad: `git config core.hooksPath /root/tools/git-hooks`.

Manuell: `git push origin main && /root/tools/git-personal-mirror.sh`

Wenn `personal` eine andere Historie hat: `git push personal main:make-main`. Nie `--force` auf `personal` ohne Raphael.

## Vercel

Live-Site hängt am **Org-Repo**, nicht am privaten Spiegel.

```bash
vercel link --yes --project <projekt> --scope make-marketing-gmbh
vercel git connect https://github.com/MAKE-Marketing-GmbH/<slug>.git --yes
```

Preview = Feature-Branch + Push auf `origin`. Production = Merge auf `main` oder Raphael sagt `vercel --prod`.

## Plugin-Skills (nach `/vercel-plugin` Session)

| Situation | Skill / Command |
|---|---|
| Link, Deploys, Branch-URL | `/vercel-plugin:status` |
| Preview deployen | `/vercel-plugin:deploy` |
| Env pull/add | `/vercel-plugin:env`, Skill `env-vars` |
| Git, Promote, Rollback | `deployments-cicd` |
| CLI-Fragen | `vercel-cli` |
| Blob/CMS-Medien | `vercel-storage` |
| Langsame Seite | `cdn-caching` |
| Next-Landing | `nextjs`, `react-best-practices` |
| Formular-Spam | `vercel-firewall` |

Nicht laden: eve, ai-gateway, chat-sdk, next-forge, Flags.

Neue Agent-Session, sonst fehlen die Slash-Commands.
