import { cn } from '@/shared/utils';

interface PortaFiLogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

export const PortaFiLogo = ({ className, size = 'md' }: PortaFiLogoProps) => {
  const sizeClasses = {
    sm: 'w-6 h-6',
    md: 'w-8 h-8',
    lg: 'w-10 h-10',
  };

  return (
    <svg
      className={cn(sizeClasses[size], className)}
      viewBox="0 0 120 120"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Background circle */}
      <circle
        className="text-blue-500 dark:text-blue-400"
        cx="60"
        cy="60"
        fill="currentColor"
        opacity="0.1"
        r="55"
      />

      {/* Portfolio/Pie chart representation */}
      <g transform="translate(60, 60)">
        {/* Main circle representing portfolio */}
        <circle
          className="text-blue-600 dark:text-blue-300"
          cx="0"
          cy="0"
          fill="none"
          r="35"
          stroke="currentColor"
          strokeWidth="3"
        />

        {/* Portfolio segments (simplified pie chart) */}
        <path
          className="text-green-500 dark:text-green-400"
          d="M 0,-35 A 35,35 0 0,1 24.7,-24.7 L 0,0 Z"
          fill="currentColor"
          opacity="0.8"
        />
        <path
          className="text-yellow-500 dark:text-yellow-400"
          d="M 24.7,-24.7 A 35,35 0 0,1 35,0 L 0,0 Z"
          fill="currentColor"
          opacity="0.8"
        />
        <path
          className="text-purple-500 dark:text-purple-400"
          d="M 35,0 A 35,35 0 0,1 0,35 L 0,0 Z"
          fill="currentColor"
          opacity="0.8"
        />
        <path
          className="text-blue-500 dark:text-blue-400"
          d="M 0,35 A 35,35 0 0,1 -35,0 L 0,0 Z"
          fill="currentColor"
          opacity="0.8"
        />
        <path
          className="text-red-500 dark:text-red-400"
          d="M -35,0 A 35,35 0 0,1 0,-35 L 0,0 Z"
          fill="currentColor"
          opacity="0.8"
        />

        {/* Inner circle with Ethereum-inspired diamond */}
        <circle
          className="text-slate-100 dark:text-slate-800"
          cx="0"
          cy="0"
          fill="currentColor"
          r="18"
        />

        {/* Ethereum-style diamond */}
        <g className="text-slate-800 dark:text-slate-100">
          {/* Top part of diamond */}
          <path
            d="M 0,-12 L -8,-2 L 0,2 L 8,-2 Z"
            fill="currentColor"
            opacity="0.9"
          />
          {/* Bottom part of diamond */}
          <path
            d="M 0,2 L -8,-2 L 0,12 Z"
            fill="currentColor"
            opacity="0.6"
          />
          <path
            d="M 0,2 L 8,-2 L 0,12 Z"
            fill="currentColor"
            opacity="0.8"
          />
        </g>

        {/* Financial trend line overlay */}
        <g
          className="text-emerald-600 dark:text-emerald-400"
          fill="none"
          opacity="0.7"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path d="M -30,-15 Q -20,-10 -10,-12 Q 0,-8 10,-5 Q 20,-2 30,5" />
          {/* Data points */}
          <circle
            cx="-25"
            cy="-12"
            fill="currentColor"
            r="1.5"
          />
          <circle
            cx="-10"
            cy="-12"
            fill="currentColor"
            r="1.5"
          />
          <circle
            cx="10"
            cy="-5"
            fill="currentColor"
            r="1.5"
          />
          <circle
            cx="25"
            cy="2"
            fill="currentColor"
            r="1.5"
          />
        </g>
      </g>

      {/* Corner accent elements */}
      <g
        className="text-blue-500 dark:text-blue-400"
        opacity="0.3"
      >
        <circle
          cx="20"
          cy="20"
          fill="currentColor"
          r="3"
        />
        <circle
          cx="100"
          cy="20"
          fill="currentColor"
          r="2"
        />
        <circle
          cx="20"
          cy="100"
          fill="currentColor"
          r="2"
        />
        <circle
          cx="100"
          cy="100"
          fill="currentColor"
          r="3"
        />
      </g>
    </svg>
  );
};
