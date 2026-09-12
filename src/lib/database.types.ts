export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  __InternalSupabase: {
    PostgrestVersion: "14.5"
  }
  public: {
    Tables: {
      assessment_history: {
        Row: {
          certificate_id: string | null
          completed_at: string | null
          confidence_score: number | null
          evaluation: Json | null
          id: string
          profile_id: string | null
          score: number
          skill_name: string
          skill_slug: string
          status: string
          verification_hash: string | null
        }
        Insert: {
          certificate_id?: string | null
          completed_at?: string | null
          confidence_score?: number | null
          evaluation?: Json | null
          id?: string
          profile_id?: string | null
          score: number
          skill_name: string
          skill_slug: string
          status?: string
          verification_hash?: string | null
        }
        Update: {
          certificate_id?: string | null
          completed_at?: string | null
          confidence_score?: number | null
          evaluation?: Json | null
          id?: string
          profile_id?: string | null
          score?: number
          skill_name?: string
          skill_slug?: string
          status?: string
          verification_hash?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "assessment_history_profile_id_fkey"
            columns: ["profile_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "assessment_history_profile_id_fkey"
            columns: ["profile_id"]
            isOneToOne: false
            referencedRelation: "v_verified_leaderboard"
            referencedColumns: ["id"]
          },
        ]
      }
      evidence_reports: {
        Row: {
          comparison_table: Json | null
          created_at: string | null
          evidence_confidence: number | null
          experience_depth_score: number | null
          extracted_technologies: Json | null
          id: string
          profile_id: string | null
          project_relevance_score: number | null
          raw_evidence: Json | null
          skill_match_score: number | null
          unsupported_claims: Json | null
        }
        Insert: {
          comparison_table?: Json | null
          created_at?: string | null
          evidence_confidence?: number | null
          experience_depth_score?: number | null
          extracted_technologies?: Json | null
          id?: string
          profile_id?: string | null
          project_relevance_score?: number | null
          raw_evidence?: Json | null
          skill_match_score?: number | null
          unsupported_claims?: Json | null
        }
        Update: {
          comparison_table?: Json | null
          created_at?: string | null
          evidence_confidence?: number | null
          experience_depth_score?: number | null
          extracted_technologies?: Json | null
          id?: string
          profile_id?: string | null
          project_relevance_score?: number | null
          raw_evidence?: Json | null
          skill_match_score?: number | null
          unsupported_claims?: Json | null
        }
        Relationships: [
          {
            foreignKeyName: "evidence_reports_profile_id_fkey"
            columns: ["profile_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "evidence_reports_profile_id_fkey"
            columns: ["profile_id"]
            isOneToOne: false
            referencedRelation: "v_verified_leaderboard"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          assessment_score: number | null
          avatar_url: string | null
          bio: string | null
          created_at: string | null
          email: string | null
          full_name: string
          github_username: string | null
          hackathon: string | null
          id: string
          linkedin_url: string | null
          location: string | null
          overall_trust_score: number | null
          passport_id: string | null
          portfolio_url: string | null
          role: string | null
          university: string | null
          updated_at: string | null
          username: string
          verification_level: string | null
        }
        Insert: {
          assessment_score?: number | null
          avatar_url?: string | null
          bio?: string | null
          created_at?: string | null
          email?: string | null
          full_name: string
          github_username?: string | null
          hackathon?: string | null
          id?: string
          linkedin_url?: string | null
          location?: string | null
          overall_trust_score?: number | null
          passport_id?: string | null
          portfolio_url?: string | null
          role?: string | null
          university?: string | null
          updated_at?: string | null
          username: string
          verification_level?: string | null
        }
        Update: {
          assessment_score?: number | null
          avatar_url?: string | null
          bio?: string | null
          created_at?: string | null
          email?: string | null
          full_name?: string
          github_username?: string | null
          hackathon?: string | null
          id?: string
          linkedin_url?: string | null
          location?: string | null
          overall_trust_score?: number | null
          passport_id?: string | null
          portfolio_url?: string | null
          role?: string | null
          university?: string | null
          updated_at?: string | null
          username?: string
          verification_level?: string | null
        }
        Relationships: []
      }
      recruiter_bookmarks: {
        Row: {
          candidate_profile_id: string | null
          created_at: string | null
          id: string
          notes: string | null
          recruiter_username: string
          stage: string | null
        }
        Insert: {
          candidate_profile_id?: string | null
          created_at?: string | null
          id?: string
          notes?: string | null
          recruiter_username: string
          stage?: string | null
        }
        Update: {
          candidate_profile_id?: string | null
          created_at?: string | null
          id?: string
          notes?: string | null
          recruiter_username?: string
          stage?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "recruiter_bookmarks_candidate_profile_id_fkey"
            columns: ["candidate_profile_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "recruiter_bookmarks_candidate_profile_id_fkey"
            columns: ["candidate_profile_id"]
            isOneToOne: false
            referencedRelation: "v_verified_leaderboard"
            referencedColumns: ["id"]
          },
        ]
      }
      skills: {
        Row: {
          category: string
          created_at: string | null
          evidence_confidence: number | null
          evidence_count: number | null
          experience_depth_score: number | null
          id: string
          is_unsupported: boolean | null
          last_verified: string | null
          level: string
          name: string
          profile_id: string | null
          project_relevance_score: number | null
          projects_found: number | null
          repositories_found: number | null
          skill_maturity: string | null
          slug: string
          trust_score: number
          unsupported_reason: string | null
          verification_level: number
          years_of_exposure: number | null
        }
        Insert: {
          category?: string
          created_at?: string | null
          evidence_confidence?: number | null
          evidence_count?: number | null
          experience_depth_score?: number | null
          id?: string
          is_unsupported?: boolean | null
          last_verified?: string | null
          level?: string
          name: string
          profile_id?: string | null
          project_relevance_score?: number | null
          projects_found?: number | null
          repositories_found?: number | null
          skill_maturity?: string | null
          slug?: string
          trust_score?: number
          unsupported_reason?: string | null
          verification_level?: number
          years_of_exposure?: number | null
        }
        Update: {
          category?: string
          created_at?: string | null
          evidence_confidence?: number | null
          evidence_count?: number | null
          experience_depth_score?: number | null
          id?: string
          is_unsupported?: boolean | null
          last_verified?: string | null
          level?: string
          name?: string
          profile_id?: string | null
          project_relevance_score?: number | null
          projects_found?: number | null
          repositories_found?: number | null
          skill_maturity?: string | null
          slug?: string
          trust_score?: number
          unsupported_reason?: string | null
          verification_level?: number
          years_of_exposure?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "skills_profile_id_fkey"
            columns: ["profile_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "skills_profile_id_fkey"
            columns: ["profile_id"]
            isOneToOne: false
            referencedRelation: "v_verified_leaderboard"
            referencedColumns: ["id"]
          },
        ]
      }
      team_invites: {
        Row: {
          hackathon: string
          id: string
          invited_candidate_username: string
          message: string | null
          role: string
          sent_at: string | null
          status: string | null
          team_avatar: string | null
          team_id: string
          team_name: string
        }
        Insert: {
          hackathon?: string
          id?: string
          invited_candidate_username: string
          message?: string | null
          role: string
          sent_at?: string | null
          status?: string | null
          team_avatar?: string | null
          team_id: string
          team_name: string
        }
        Update: {
          hackathon?: string
          id?: string
          invited_candidate_username?: string
          message?: string | null
          role?: string
          sent_at?: string | null
          status?: string | null
          team_avatar?: string | null
          team_id?: string
          team_name?: string
        }
        Relationships: []
      }
      teams: {
        Row: {
          avatar: string | null
          created_at: string | null
          description: string | null
          hackathon: string | null
          id: string
          looking_for: Json | null
          members: Json | null
          name: string
          open_spots: number | null
          skill_coverage: Json | null
          slug: string
          tagline: string | null
        }
        Insert: {
          avatar?: string | null
          created_at?: string | null
          description?: string | null
          hackathon?: string | null
          id?: string
          looking_for?: Json | null
          members?: Json | null
          name: string
          open_spots?: number | null
          skill_coverage?: Json | null
          slug: string
          tagline?: string | null
        }
        Update: {
          avatar?: string | null
          created_at?: string | null
          description?: string | null
          hackathon?: string | null
          id?: string
          looking_for?: Json | null
          members?: Json | null
          name?: string
          open_spots?: number | null
          skill_coverage?: Json | null
          slug?: string
          tagline?: string | null
        }
        Relationships: []
      }
    }
    Views: {
      v_verified_leaderboard: {
        Row: {
          avatar_url: string | null
          full_name: string | null
          high_trust_skills: number | null
          id: string | null
          overall_trust_score: number | null
          role: string | null
          total_skills: number | null
          unsupported_claims_count: number | null
          username: string | null
          verification_level: string | null
        }
        Relationships: []
      }
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}
