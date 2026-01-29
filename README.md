CAIPE – AI Platform Engineering Multi‑Agent System
=================================================

CAIPE (CNOE AI Platform Engineering) is a **multi‑agent system** that helps platform teams operate their infrastructure with AI assistance. You describe what you need in natural language; CAIPE’s supervisor agent then coordinates many specialized agents (ArgoCD, AWS, GitHub, Jira, Slack, etc.) to inspect systems, make changes, and report back clearly.

In short: **one AI “platform engineer” on top of many tools and APIs.**

---

What CAIPE Does
---------------

- **Orchestrates multiple agents**  
  A supervisor agent understands the request and routes work to domain‑specific agents (ArgoCD, AWS, GitHub, GitLab, Jira, Komodor, PagerDuty, Slack, Splunk, Webex, Weather, Petstore, and more).

- **Answers questions using your own data**  
  A Retrieval‑Augmented Generation (RAG) layer combines:
  - **Vector search (Milvus)** for unstructured docs.
  - **Graph search (Neo4j)** for relationships (services, teams, dependencies, incidents).

- **Provides a web UI**  
  A Next.js/React UI lets you chat with the system, see which agents were used, and inspect results.

- **Supports real‑world deployments**  
  Run it:
  - Locally for development
  - As Docker Compose for a full local stack
  - On Kubernetes using Helm charts

---

Tech Stack (At a Glance)
------------------------

- **Backend**: Python 3.13+, LangGraph, LangChain, FastAPI, A2A SDK  
- **Frontend**: Next.js (React, TypeScript, Tailwind CSS, Radix UI)  
- **Data & storage**: Milvus (vector DB), Neo4j (graph DB), Redis (metadata/cache)  
- **Infra & tooling**: Docker, Docker Compose, Helm, `uv`, Make, GitHub Actions  

---

Repository Tour
---------------

- `ai_platform_engineering/` – Main Python package
  - `agents/` – Individual agents for each external system (ArgoCD, AWS, GitHub, Jira, Slack, etc.).
  - `multi_agents/` – Supervisor/orchestrator logic (e.g. the “platform engineer” persona).
  - `knowledge_bases/rag/` – RAG services, ontology agent, and document/graph ingestors.
  - `utils/` – Shared utilities and helpers.
- `ui/` – Next.js web application for interacting with the agents.
- `charts/` – Helm charts for Kubernetes deployments.
- `docker-compose/` – Generated Docker Compose files for different personas/setups.
- `integration/` – Integration and sanity tests.
- `docs/` – Docusaurus documentation site.
- `build/` – Dockerfiles and build scripts.
- `scripts/` – Utility scripts (e.g. Docker Compose generation from persona configs).

For deeper details and diagrams, see the Docusaurus docs in `docs/`.

---

Quick Start
-----------

### 1. Prerequisites

- Python **3.13+**
- **uv** (Python package manager)
- **Docker** and **Docker Compose**
- **Node.js 18+** and **npm** (for the UI)

### 2. Clone and configure

### 3. Install backend dependencies

```bash
make setup-venv        # create virtual environment
uv sync --no-dev       # install Python dependencies
```

### 4. Install UI dependencies

```bash
cd ui
npm install
cd ..
```

---

Running CAIPE
-------------

### Option A – Local development

**Backend (supervisor & agents):**

```bash
make run
# or explicitly:
uv run python -m ai_platform_engineering.multi_agents platform-engineer
```

**UI (separate terminal):**

```bash
make caipe-ui-dev
# or:
cd ui
npm run dev
```

Open the URL printed by the UI (by default `http://localhost:3000`).

### Option B – Docker Compose

Use Docker Compose for a full local stack that is closer to production.

```bash
# Generate a docker-compose file for the desired persona
make generate-docker-compose PERSONAS="p2p-basic"

# Start services
docker compose -f docker-compose.yaml up
```

### Option C – Kubernetes (Helm)

```bash
cp charts/ai-platform-engineering/values-secrets.yaml.example values-secrets.yaml
# Edit values-secrets.yaml with your secrets and configuration

helm install caipe charts/ai-platform-engineering -f values-secrets.yaml
```

---

Configuration Basics
--------------------

- **`.env`** – LLM keys, agent enablement flags (`ENABLE_ARGOCD`, `ENABLE_AWS`, etc.), transport settings, and other runtime configuration.
- **Persona & prompt config** – Controls how the supervisor and agents behave for different roles/use cases.
- **Transport** – Configure A2A transport (for example `A2A_TRANSPORT=p2p` or `slim`).

---

Testing & Quality
-----------------

**Python tests:**

```bash
make test             # all tests
make test-supervisor  # supervisor tests
make test-agents      # agent tests
make test-rag-unit    # RAG tests
```

**Integration / sanity tests:**

```bash
make quick-sanity
make detailed-sanity
make argocd-sanity
```

**UI tests:**

```bash
make caipe-ui-tests
```

**Linting & validation:**

```bash
make lint        # Python linting (Ruff)
make lint-fix    # Auto-fix Python issues

cd ui
npm run lint     # TypeScript / ESLint
cd ..

make validate    # Combined validation (lint + tests)
```

---

Contributing & Workflow
-----------------------

This repository uses **bd (beads)** for issue tracking and workflow:

```bash
bd onboard                   # first-time setup
bd ready                     # list available work
bd show <id>                 # view issue details
bd update <id> --status in_progress
bd close <id>
bd sync                      # sync beads with git
```

See `AGENTS.md` for mandatory “landing the plane” steps (tests, issues, `git push`, etc.) when finishing work.

Contributions are welcome—whether you are adding new agents, extending the RAG knowledge base, improving the UI, or enhancing documentation.

