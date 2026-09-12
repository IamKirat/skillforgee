'use client';

import React, { useState, useEffect } from 'react';
import { UserPlus, X, Send } from 'lucide-react';
import { useSkillForge } from '@/lib/store';

interface InviteToTeamModalProps {
  isOpen: boolean;
  onClose: () => void;
  candidateName?: string;
  candidateUsername?: string;
  initialRole?: string;
  initialMessage?: string;
  onSuccess?: () => void;
}

export const InviteToTeamModal: React.FC<InviteToTeamModalProps> = ({
  isOpen,
  onClose,
  candidateName = 'Alex Morgan',
  candidateUsername = 'alexmorgan',
  initialRole = 'Frontend Developer',
  initialMessage = "We're looking for someone strong in React. Your verified profile looks like a good fit.",
  onSuccess,
}) => {
  const { sendTeamInvite, showToast } = useSkillForge();

  // Extract first name (e.g., 'Alex Morgan' -> 'Alex')
  const firstName = candidateName ? candidateName.split(' ')[0] : 'Alex';

  // Form states
  const [team, setTeam] = useState('CodeForge');
  const [hackathon, setHackathon] = useState('SkillSprint 2026');
  const [lookingFor, setLookingFor] = useState(initialRole);
  const [message, setMessage] = useState(initialMessage);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Sync when props change
  useEffect(() => {
    setLookingFor(initialRole);
    setMessage(initialMessage);
  }, [initialRole, initialMessage, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Record the invite in store
    sendTeamInvite(candidateUsername, team, lookingFor, message);

    // Trigger success toast as specified: "Team invitation sent."
    showToast('Team invitation sent.');

    setIsSubmitting(false);
    if (onSuccess) onSuccess();
    onClose();
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="invite-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs animate-in fade-in duration-150"
    >
      <div className="w-full max-w-lg rounded-3xl bg-white border border-[#E5E7EB] p-6 sm:p-7 shadow-floating space-y-5 animate-in zoom-in-95 duration-150">
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-[#E5E7EB]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-[#635BFF]/10 border border-[#635BFF]/20 flex items-center justify-center text-[#635BFF]">
              <UserPlus size={20} />
            </div>
            <div>
              <h3 id="invite-modal-title" className="text-lg font-bold text-[#0A0A0A] tracking-tight">
                Invite {firstName} to your team
              </h3>
              <p className="text-xs text-[#6B7280]">
                Send an official recruitment invitation on SkillForge.
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="text-[#9CA3AF] hover:text-[#0A0A0A] text-sm p-1.5 rounded-xl hover:bg-[#F8FAFC] transition-colors cursor-pointer"
            aria-label="Close dialog"
          >
            <X size={18} />
          </button>
        </div>

        {/* Invitation Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Team Field */}
          <div>
            <label className="block text-xs font-semibold text-[#374151] mb-1.5 font-mono">
              Team
            </label>
            <input
              type="text"
              value={team}
              onChange={e => setTeam(e.target.value)}
              required
              className="w-full px-3.5 py-2.5 rounded-xl bg-[#F8FAFC] border border-[#E5E7EB] text-xs sm:text-sm text-[#0A0A0A] focus:outline-none focus:border-[#635BFF] focus:bg-white transition-colors font-medium"
            />
          </div>

          {/* Hackathon Field */}
          <div>
            <label className="block text-xs font-semibold text-[#374151] mb-1.5 font-mono">
              Hackathon
            </label>
            <input
              type="text"
              value={hackathon}
              onChange={e => setHackathon(e.target.value)}
              required
              className="w-full px-3.5 py-2.5 rounded-xl bg-[#F8FAFC] border border-[#E5E7EB] text-xs sm:text-sm text-[#0A0A0A] focus:outline-none focus:border-[#635BFF] focus:bg-white transition-colors font-medium"
            />
          </div>

          {/* Looking for Field */}
          <div>
            <label className="block text-xs font-semibold text-[#374151] mb-1.5 font-mono">
              Looking for
            </label>
            <input
              type="text"
              value={lookingFor}
              onChange={e => setLookingFor(e.target.value)}
              placeholder="e.g. Frontend Developer"
              required
              className="w-full px-3.5 py-2.5 rounded-xl bg-[#F8FAFC] border border-[#E5E7EB] text-xs sm:text-sm text-[#0A0A0A] focus:outline-none focus:border-[#635BFF] focus:bg-white transition-colors font-medium"
            />
          </div>

          {/* Message Field */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="text-xs font-semibold text-[#374151] font-mono">
                Message
              </label>
              <span className="text-[11px] text-[#9CA3AF] font-mono">Custom pitch</span>
            </div>
            <textarea
              rows={3}
              value={message}
              onChange={e => setMessage(e.target.value)}
              required
              placeholder="Write your invitation note..."
              className="w-full px-3.5 py-2.5 rounded-xl bg-[#F8FAFC] border border-[#E5E7EB] text-xs sm:text-sm text-[#0A0A0A] placeholder-[#9CA3AF] focus:outline-none focus:border-[#635BFF] focus:bg-white transition-colors leading-relaxed"
            />
          </div>

          {/* Action Buttons */}
          <div className="flex items-center justify-end gap-2.5 pt-3 border-t border-[#E5E7EB]">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 rounded-xl bg-[#F8FAFC] hover:bg-[#F1F5F9] border border-[#E5E7EB] text-xs font-semibold text-[#6B7280] hover:text-[#0A0A0A] transition-colors cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-[#635BFF] hover:bg-[#5248E5] text-xs font-bold text-white shadow-sm hover:shadow transition-all cursor-pointer"
            >
              <Send size={14} />
              <span>Send Invite</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
