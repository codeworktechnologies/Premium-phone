export default function Logo({ className = "" }) {
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <div className="grid size-9 place-items-center rounded-xl bg-indigo-500/20 ring-1 ring-indigo-400/30">
        <div className="size-4 rounded-md bg-indigo-400 shadow-[0_0_30px_rgba(99,102,241,0.55)]" />
      </div>
      <div className="leading-tight">
        <div className="text-sm font-extrabold tracking-wide">SellPhone</div>
        <div className="text-[11px] text-zinc-500 dark:text-white/60">Premium Phone Shop</div>
      </div>
    </div>
  );
}


