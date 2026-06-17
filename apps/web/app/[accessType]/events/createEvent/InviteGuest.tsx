import { FormInput } from "@sambha/ui/form/FormInput";
import { useState } from "react";

interface InviteGuestProps {
  inviteEmails?: string;
  setInviteEmails?: (emails: string) => void;
}

export const InviteGuest: React.FC<InviteGuestProps> = ({
  inviteEmails = "",
  setInviteEmails,
}) => {
  const [tempEmail, setTempEmail] = useState("");
  const [invitedEmails, setInvitedEmails] = useState<string[]>(
    inviteEmails
      ? inviteEmails
          .split(",")
          .map((email) => email.trim())
          .filter(Boolean)
      : []
  );

  const handleAddEmail = () => {
    if (tempEmail.trim()) {
      // Validate email format
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      const emails = tempEmail.split(",").map((email) => email.trim());

      const validEmails: string[] = [];
      const invalidEmails: string[] = [];

      emails.forEach((email) => {
        if (email && emailRegex.test(email)) {
          validEmails.push(email);
        } else if (email) {
          invalidEmails.push(email);
        }
      });

      if (invalidEmails.length > 0) {
        alert(`Invalid email format: ${invalidEmails.join(", ")}`);
        return;
      }

      if (validEmails.length > 0) {
        const newInvitedEmails = [...invitedEmails];

        validEmails.forEach((email) => {
          if (!newInvitedEmails.includes(email)) {
            newInvitedEmails.push(email);
          }
        });

        setInvitedEmails(newInvitedEmails);
        const emailString = newInvitedEmails.join(", ");

        if (setInviteEmails) {
          setInviteEmails(emailString);
        }

        setTempEmail("");
      }
    }
  };

  const handleRemoveEmail = (emailToRemove: string) => {
    const newInvitedEmails = invitedEmails.filter(
      (email) => email !== emailToRemove
    );
    setInvitedEmails(newInvitedEmails);

    const emailString = newInvitedEmails.join(", ");
    if (setInviteEmails) {
      setInviteEmails(emailString);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleAddEmail();
    }
  };

  return (
    <div className="space-y-8 pt-12">
      <div className="">
        <p className="text-xl sm:text-2xl font-semibold text-primary-darkPurple">
          Invite guests
        </p>
        <p className="text-gray-base">
          Add your guests via email or create a public invitation link to share.
        </p>
      </div>

      <div className="space-y-4">
        <div className="space-y-2">
          <div className="relative w-full">
            <FormInput
              placeholder="Enter email or phone number"
              value={tempEmail}
              onChange={(e) => setTempEmail(e.target.value)}
              onKeyPress={handleKeyPress}
            />
            <button
              type="button"
              onClick={handleAddEmail}
              className="text-gray-base font-medium px-5 py-[13px] max-h-[37px] flex items-center justify-center rounded-full bg-white-800 absolute right-4 top-1/2 transform -translate-y-1/2 hover:bg-gray-100 transition-colors"
            >
              Invite
            </button>
          </div>
          <p className="text-sm font-normal text-gray-base">
            Use comma to add multiple emails
          </p>
        </div>

        {/* Display invited emails */}
        {invitedEmails.length > 0 && (
          <div className="space-y-2">
            <p className="text-sm font-medium text-gray-700">Invited guests:</p>
            <div className="flex flex-wrap gap-2">
              {invitedEmails.map((email, index) => (
                <div
                  key={index}
                  className="flex items-center gap-2 bg-gray-100 px-3 py-1 rounded-full text-sm"
                >
                  <span>{email}</span>
                  <button
                    type="button"
                    onClick={() => handleRemoveEmail(email)}
                    className="text-red-500 hover:text-red-700 text-lg leading-none"
                    aria-label={`Remove ${email}`}
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
