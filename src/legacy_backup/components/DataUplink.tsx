import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { RefreshCw, CheckCircle, Wifi, Database } from "lucide-react";
import { UserProfileService, LinkedInProfile } from "../services/UserProfileService";

export default function DataUplink() {
  const [isSyncing, setIsSyncing] = useState(false);
  const [data, setData] = useState<LinkedInProfile | null>(null);

  const handleSync = async () => {
    setIsSyncing(true);
    setData(null);
    
    try {
      const result = await UserProfileService.syncWithLinkedIn();
      setData(result);
    } finally {
      setIsSyncing(false);
    }
  };

  return (
    <div className="p-4 rounded-xl bg-[#0f1623] border border-white/10 w-full max-w-sm mx-auto mt-8 relative overflow-hidden group">
      {/* Decorative Background */}
      <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity" />
      
      <div className="flex items-center justify-between mb-4 relative z-10">
        <div className="flex items-center gap-2">
            <div className={`w-2 h-2 rounded-full ${isSyncing ? 'bg-yellow-400 animate-ping' : data ? 'bg-green-400' : 'bg-slate-500'}`} />
            <h3 className="text-sm font-bold text-white tracking-wide">LINKEDIN_UPLINK</h3>
        </div>
        <Wifi size={16} className={isSyncing ? "animate-pulse text-yellow-400" : "text-slate-600"} />
      </div>

      <div className="space-y-4 relative z-10">
        {!data && !isSyncing && (
             <div className="text-xs text-slate-500 font-mono">
                STATUS: DISCONNECTED
                <br />
                LAST_SYNC: UNKNOWN
             </div>
        )}

        {isSyncing && (
            <div className="font-mono text-xs text-primary space-y-1">
                <motion.div animate={{ opacity: [0, 1, 0] }} transition={{ duration: 0.5, repeat: Infinity }}>
                    &gt; ESTABLISHING_HANDSHAKE...
                </motion.div>
                <motion.div animate={{ opacity: [0, 1, 0] }} transition={{ duration: 0.5, delay: 0.2, repeat: Infinity }}>
                    &gt; DECRYPTING_OAUTH_TOKEN...
                </motion.div>
                <motion.div animate={{ opacity: [0, 1, 0] }} transition={{ duration: 0.5, delay: 0.4, repeat: Infinity }}>
                    &gt; DOWNLOADING_PACKETS...
                </motion.div>
            </div>
        )}

        {data && (
            <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="grid grid-cols-2 gap-2"
            >
                <div className="bg-black/30 p-2 rounded border border-white/5">
                    <div className="text-[10px] text-slate-400 uppercase">Connections</div>
                    <div className="text-xl font-bold text-white">{data.connections}</div>
                </div>
                <div className="bg-black/30 p-2 rounded border border-white/5">
                     <div className="text-[10px] text-slate-400 uppercase">Profile Views</div>
                     <div className="text-xl font-bold text-green-400">+{data.profileViews}</div>
                </div>
                <div className="col-span-2 text-center bg-primary/10 p-2 rounded border border-primary/20 text-xs text-primary font-bold">
                    Profile Verification: ACTIVE
                </div>
            </motion.div>
        )}

        <button
            onClick={handleSync}
            disabled={isSyncing}
            className={`w-full py-2 rounded font-bold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2
                ${isSyncing ? 'bg-white/5 text-slate-500 cursor-not-allowed' : 'bg-primary hover:bg-primary/90 text-black'}
            `}
        >
            {isSyncing ? <RefreshCw className="animate-spin" size={14} /> : <Database size={14} />}
            {isSyncing ? "SYNCING..." : data ? "REFRESH_DATA" : "CONNECT_MAINFRAME"}
        </button>
      </div>
      
      {/* Matrix Overlay while syncing */}
      {isSyncing && (
          <div className="absolute inset-0 bg-black/80 z-0 flex items-end justify-center pb-20 pointer-events-none">
             <div className="font-mono text-green-500 text-xs opacity-20 break-all p-2">
                 0101010100101010101010100101011101010101001010101
             </div>
          </div>
      )}
    </div>
  );
}
