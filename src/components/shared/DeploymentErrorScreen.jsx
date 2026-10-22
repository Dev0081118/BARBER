import { ShieldAlert } from "lucide-react";

export default function DeploymentErrorScreen({ code, requestedSlug, message }) {
  return (
    <main className="flex min-h-screen items-center justify-center bg-[#0d0e12] p-6 text-white font-sans">
      <div className="max-w-[560px] rounded-2xl border border-red-500/30 bg-[#161820] p-8 shadow-2xl backdrop-blur-md">
        <div className="flex items-center gap-3 text-red-400 mb-6">
          <ShieldAlert className="h-8 w-8" />
          <h1 className="text-xl font-bold tracking-tight">Deployment Configuration Required</h1>
        </div>

        <div className="rounded-lg bg-red-950/40 border border-red-900/50 p-4 mb-6">
          <p className="font-mono text-xs text-red-200">
            {code === "MISSING_SLUG" ? (
              <>
                <strong>Error:</strong> Missing environment variable <code className="bg-black/50 px-1.5 py-0.5 rounded text-amber-300">VITE_BARBER_SLUG</code>.
              </>
            ) : (
              <>
                <strong>Error:</strong> Unknown client slug <code className="bg-black/50 px-1.5 py-0.5 rounded text-amber-300">"{requestedSlug}"</code>.
              </>
            )}
          </p>
          <p className="text-xs text-neutral-300 mt-2 leading-relaxed">
            {message || "To protect client data isolation, this deployment cannot proceed without a valid verified client configuration."}
          </p>
        </div>

        <div className="space-y-4 text-xs text-neutral-300 border-t border-white/10 pt-6">
          <h2 className="font-semibold uppercase tracking-wider text-neutral-400">
            How to resolve in Vercel:
          </h2>
          <ol className="list-decimal list-inside space-y-2 text-neutral-400">
            <li>Open the Vercel Project Dashboard for this website.</li>
            <li>Go to <strong className="text-white">Settings → Environment Variables</strong>.</li>
            <li>Add <code className="font-mono text-amber-300">VITE_BARBER_SLUG</code> with the client's verified slug (e.g. <code className="font-mono text-white">hammoudi</code>, <code className="font-mono text-white">district-nine</code>, <code className="font-mono text-white">st-george-guild</code>).</li>
            <li>Redeploy the project.</li>
          </ol>
        </div>

        <div className="mt-8 border-t border-white/10 pt-4 flex justify-between items-center text-[11px] text-neutral-500 font-mono">
          <span>Barber Multi-Client Master Template</span>
          <span>Status: Safe Halt</span>
        </div>
      </div>
    </main>
  );
}
