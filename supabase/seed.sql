-- Seed data for SkillForge PostgreSQL database

-- 1. Alex Morgan Candidate Profile
INSERT INTO public.profiles (
  id, username, full_name, role, avatar_url, overall_trust_score, bio,
  location, university, hackathon, passport_id, github_username, portfolio_url, linkedin_url,
  verification_level, assessment_score
) VALUES (
  '02b9cab1-d24d-4c9d-9f55-db7954a2cc90',
  'alex',
  'Alex Morgan',
  'Senior Full Stack & Distributed Systems Engineer',
  'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
  89,
  'Passionate systems builder specializing in high-throughput microservices, real-time engines, and distributed databases. 6+ years building scalable cloud platforms.',
  'San Francisco, CA (Remote OK)',
  'Tech University',
  'HackGenesis 2026',
  'SF-PASS-8842-X7',
  'alexmorgan-dev',
  'https://alexmorgan.dev',
  'https://linkedin.com/in/alexmorgan',
  'Level 3 — Evidence Verified',
  92
) ON CONFLICT (username) DO UPDATE SET 
  overall_trust_score = EXCLUDED.overall_trust_score,
  verification_level = EXCLUDED.verification_level;

-- 2. Skills Inventory
DELETE FROM public.skills WHERE profile_id = '02b9cab1-d24d-4c9d-9f55-db7954a2cc90';

INSERT INTO public.skills (
  profile_id, name, slug, category, level, verification_level, trust_score, evidence_confidence,
  projects_found, repositories_found, evidence_count, is_unsupported, unsupported_reason,
  project_relevance_score, experience_depth_score, skill_maturity, years_of_exposure
) VALUES 
(
  '02b9cab1-d24d-4c9d-9f55-db7954a2cc90',
  'React',
  'react',
  'frontend',
  'Level 5 — Industry Proven',
  5,
  98,
  96,
  5,
  4,
  18,
  false,
  null,
  95,
  96,
  'Mastery',
  4.5
),
(
  '02b9cab1-d24d-4c9d-9f55-db7954a2cc90',
  'Machine Learning',
  'machine-learning',
  'ai',
  'Level 4 — Skill Verified',
  4,
  92,
  90,
  4,
  3,
  14,
  false,
  null,
  92,
  90,
  'Proficient',
  2.2
),
(
  '02b9cab1-d24d-4c9d-9f55-db7954a2cc90',
  'Python',
  'python',
  'backend',
  'Level 3 — Evidence Verified',
  3,
  89,
  92,
  6,
  4,
  14,
  false,
  null,
  88,
  91,
  'Advanced',
  3.8
),
(
  '02b9cab1-d24d-4c9d-9f55-db7954a2cc90',
  'Ruby',
  'ruby',
  'backend',
  'Level 3 — Evidence Verified',
  3,
  86,
  88,
  3,
  2,
  8,
  false,
  null,
  85,
  84,
  'Advanced',
  2.8
),
(
  '02b9cab1-d24d-4c9d-9f55-db7954a2cc90',
  'Git',
  'git',
  'devops',
  'Level 2 — Git Verified',
  2,
  62,
  75,
  2,
  3,
  8,
  false,
  null,
  65,
  62,
  'Competent',
  3.0
),
(
  '02b9cab1-d24d-4c9d-9f55-db7954a2cc90',
  'Node.js',
  'nodejs',
  'backend',
  'Level 1 — Self Claimed',
  1,
  30,
  38,
  1,
  0,
  2,
  false,
  null,
  35,
  30,
  'Intermediate',
  1.5
);

-- 3. Assessment Submissions
INSERT INTO public.assessment_history (
  profile_id, skill_slug, skill_name, score, status, confidence_score, certificate_id, verification_hash
) VALUES 
(
  '02b9cab1-d24d-4c9d-9f55-db7954a2cc90',
  'react',
  'React',
  92,
  'Passed',
  92,
  'CERT-SF-92841',
  '0x7c49...32e1'
),
(
  '02b9cab1-d24d-4c9d-9f55-db7954a2cc90',
  'python',
  'Python',
  88,
  'Passed',
  88,
  'CERT-SF-88120',
  '0x3a19...90cf'
),
(
  '02b9cab1-d24d-4c9d-9f55-db7954a2cc90',
  'git',
  'Git',
  75,
  'Passed',
  75,
  'CERT-SF-75102',
  '0x992b...fa14'
);

-- 4. Teams
INSERT INTO public.teams (name, slug, tagline, description, hackathon, avatar, open_spots)
VALUES 
(
  'NeuralForge',
  'neuralforge',
  'Decentralized AI inference for verified builders',
  'Building peer-to-peer verifiable model training nodes for zero-knowledge code evaluation.',
  'HackGenesis 2026',
  'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=150&auto=format&fit=crop&q=80',
  1
),
(
  'AgentMesh',
  'agentmesh',
  'Autonomous LLM coordination mesh',
  'Creating multi-agent consensus protocols for automated smart contract security auditing.',
  'HackGenesis 2026',
  'https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?w=150&auto=format&fit=crop&q=80',
  2
) ON CONFLICT (slug) DO NOTHING;
