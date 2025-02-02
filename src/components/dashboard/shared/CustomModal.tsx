"use client";

// Provider
import { useModal } from "@/providers/ModalProvider";

// UI components
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
} from "@/components/ui/dialog";
import { DialogTitle } from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import { VisuallyHidden } from "@/components/ui/VisuallyHidden"; // Import the VisuallyHidden component

type Props = {
  heading?: string;
  subheading?: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
  maxWidth?: string;
};

const CustomModal = ({
  children,
  defaultOpen,
  subheading,
  heading,
  maxWidth,
}: Props) => {
  const { isOpen, setClose } = useModal();
  return (
    <Dialog open={isOpen || defaultOpen} onOpenChange={setClose}>
      <DialogContent
        className={cn(
          "pointer-events-auto h-screen overflow-y-scroll bg-card md:h-fit md:max-h-[700px]",
          maxWidth,
        )}
      >
        <DialogHeader className="pt-8 text-left">
          {heading ? (
            // If heading is provided, render the DialogTitle
            <DialogTitle className="text-2xl font-bold">{heading}</DialogTitle>
          ) : (
            // If heading is not provided, render a hidden DialogTitle for accessibility
            <VisuallyHidden>
              <DialogTitle>Hidden Title for Accessibility</DialogTitle>
            </VisuallyHidden>
          )}
          {subheading && <DialogDescription>{subheading}</DialogDescription>}

        </DialogHeader>
          {children}
      </DialogContent>
    </Dialog>
  );
};

export default CustomModal;
