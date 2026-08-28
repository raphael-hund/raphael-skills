#!/usr/bin/env python3
"""CLI shim for the importable vendor skill pack implementation."""
from __future__ import annotations

import sys

from vendor_skill_packs import main


if __name__ == "__main__":
    raise SystemExit(main(sys.argv))
