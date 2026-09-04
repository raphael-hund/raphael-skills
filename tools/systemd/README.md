# systemd-Units aus dem Skill-Repo

Kanonische Quelle für Units, deren Skript unter `tools/` liegt. Installation:

```bash
sudo cp /root/raphael-skills/tools/systemd/acl-mask-repair*.{service,timer} /etc/systemd/system/
sudo systemctl daemon-reload
sudo systemctl enable --now acl-mask-repair.timer acl-mask-repair-full.timer
```

| Unit | Zweck | Takt |
|---|---|---|
| `acl-mask-repair.timer` | ACL-Maske `---` für raphael-claude reparieren, inkrementell (ctime < 15 min) | alle 10 min |
| `acl-mask-repair-full.timer` | Vollscan des Konfig-Scopes inkl. `visual-harness/runs` (~3 min) | täglich 04:30 |

Skript: `tools/acl-mask-repair.sh` (Runtime-Symlink `/root/tools/acl-mask-repair.sh`). Log: `/var/log/acl-mask-repair.log`.
Hintergrund: Fix-Journal 04.09.2026, Beobachtung 50 (root-Schreibvorgänge setzen die Maske auf `---`, User-Hooks fallen still aus).
