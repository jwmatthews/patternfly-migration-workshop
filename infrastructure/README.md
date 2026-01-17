# Infrastructure Setup (For Facilitators Only)

This directory contains scripts and documentation for workshop facilitators to set up cloud infrastructure and shared resources.

**Participants do not need anything in this directory.** All participant-facing setup is in the root [SETUP.md](../SETUP.md).

---

## What's Here

### AWS Bedrock Setup

Automated setup for shared AWS Bedrock credentials:

- **[BEDROCK_SETUP.md](./BEDROCK_SETUP.md)** - Complete setup guide
- **[setup-bedrock.sh](./setup-bedrock.sh)** - Creates IAM user, policy, and credentials
- **[test-bedrock.sh](./test-bedrock.sh)** - Verifies Bedrock access

**When to use**: If providing shared AWS Bedrock access for participants instead of requiring their own API keys.

**Cost**: ~$10-20 for 30 participants

---

## Quick Start (Facilitators)

### 1 Week Before Workshop

```bash
cd infrastructure

# Update workshop date in setup-bedrock.sh
# Then run setup
./setup-bedrock.sh

# Test credentials
./test-bedrock.sh
```

This generates `bedrock-credentials.txt` (gitignored) to share with participants on workshop day.

### Workshop Day

Share credentials via Slack/Discord (private channel):
- Copy VS Code settings from `bedrock-credentials.txt`
- Participants add to their `.vscode/settings.json`

### After Workshop

```bash
# Cleanup within 24 hours
./cleanup-bedrock.sh
```

---

## Alternative Approaches

Don't want to set up AWS Bedrock? Participants can use their own AI providers:

- See [AI_PROVIDERS.md](../AI_PROVIDERS.md) for configuration options
- OpenAI, Anthropic, Ollama (local), or their own AWS accounts
- No shared credentials needed

---

## Security Notes

⚠️ **Never commit credentials to git**

Files that are auto-generated and gitignored:
- `bedrock-credentials.txt` - AWS access keys
- `cleanup-bedrock.sh` - Cleanup script with your account details

✅ **What's safe to commit**:
- Setup scripts (no secrets)
- Documentation
- This README

---

## Need Help?

- AWS Bedrock issues: See [BEDROCK_SETUP.md](./BEDROCK_SETUP.md) troubleshooting section
- Workshop questions: See [WORKSHOP_GUIDE.md](../WORKSHOP_GUIDE.md)
- Community support: #konveyor on Kubernetes Slack
