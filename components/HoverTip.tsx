import { ReactNode } from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

type Props = {
  children: ReactNode;
  tip: string;
  asChild?: boolean;
};

const HoverTip = ({ children, tip, asChild = false }: Props) => {
  return (
    <TooltipProvider delayDuration={100}>
      <Tooltip>
        <TooltipTrigger className="p-2 rounded-xl hover:bg-zinc-500 hover:text-orange-500 mr-1">
          {children}
        </TooltipTrigger>

        <TooltipContent className="dark:bg-black rounded-2xl bg-white">
          <p>{tip}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default HoverTip;
