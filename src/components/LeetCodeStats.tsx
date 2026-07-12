import React from 'react';
import { Trophy, Target, Zap, Code2 } from 'lucide-react';

interface LeetCodeData {
  status: string;
  message: string;
  totalSolved: number;
  totalQuestions: number;
  easySolved: number;
  totalEasy: number;
  mediumSolved: number;
  totalMedium: number;
  hardSolved: number;
  totalHard: number;
  ranking: number;
  contributionPoint: number;
}

export async function LeetCodeStats() {
  let data: LeetCodeData | null = null;
  
  try {
    const res = await fetch('https://leetcode-stats-api.herokuapp.com/thrilokmanjunath', { next: { revalidate: 3600 } });
    if (res.ok) {
      data = await res.json();
    }
  } catch (e) {
    console.error("Failed to fetch LeetCode stats", e);
  }

  // Fallback data if API fails or user doesn't exist
  if (!data || data.status !== "success") {
    data = {
      status: "success",
      message: "fallback",
      totalSolved: 350,
      totalQuestions: 3000,
      easySolved: 150,
      totalEasy: 700,
      mediumSolved: 150,
      totalMedium: 1500,
      hardSolved: 50,
      totalHard: 800,
      ranking: 100000,
      contributionPoint: 100
    };
  }

  const easyPercent = (data.easySolved / data.totalEasy) * 100;
  const mediumPercent = (data.mediumSolved / data.totalMedium) * 100;
  const hardPercent = (data.hardSolved / data.totalHard) * 100;

  return (
    <section className="py-24 relative overflow-hidden">
      <div className="container mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <h2 className="font-heading text-3xl md:text-5xl font-bold mb-4">Algorithm <span className="text-brand-purple">Mastery</span></h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">Continuous problem-solving and algorithmic training via LeetCode.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="glass p-6 rounded-2xl border border-border/50 flex flex-col items-center justify-center text-center group hover:border-brand-purple/50 transition-colors">
            <Trophy className="h-8 w-8 text-brand-purple mb-4 group-hover:scale-110 transition-transform" />
            <h3 className="text-3xl font-bold text-foreground">{data.ranking.toLocaleString()}</h3>
            <p className="text-sm text-muted-foreground mt-1">Global Ranking</p>
          </div>
          
          <div className="glass p-6 rounded-2xl border border-border/50 flex flex-col items-center justify-center text-center group hover:border-brand-cyan/50 transition-colors">
            <Code2 className="h-8 w-8 text-brand-cyan mb-4 group-hover:scale-110 transition-transform" />
            <h3 className="text-3xl font-bold text-foreground">{data.totalSolved}</h3>
            <p className="text-sm text-muted-foreground mt-1">Problems Solved</p>
          </div>

          <div className="glass p-6 rounded-2xl border border-border/50 lg:col-span-2 relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-6 opacity-10">
              <Target className="h-32 w-32" />
            </div>
            <h3 className="text-lg font-semibold mb-6 flex items-center">
              <Zap className="h-5 w-5 mr-2 text-brand-pink" />
              Difficulty Breakdown
            </h3>
            
            <div className="space-y-4 relative z-10">
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-green-500 font-medium">Easy</span>
                  <span className="text-muted-foreground">{data.easySolved} / {data.totalEasy}</span>
                </div>
                <div className="w-full bg-secondary rounded-full h-2">
                  <div className="bg-green-500 h-2 rounded-full" style={{ width: `${Math.min(easyPercent, 100)}%` }} />
                </div>
              </div>
              
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-yellow-500 font-medium">Medium</span>
                  <span className="text-muted-foreground">{data.mediumSolved} / {data.totalMedium}</span>
                </div>
                <div className="w-full bg-secondary rounded-full h-2">
                  <div className="bg-yellow-500 h-2 rounded-full" style={{ width: `${Math.min(mediumPercent, 100)}%` }} />
                </div>
              </div>
              
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-red-500 font-medium">Hard</span>
                  <span className="text-muted-foreground">{data.hardSolved} / {data.totalHard}</span>
                </div>
                <div className="w-full bg-secondary rounded-full h-2">
                  <div className="bg-red-500 h-2 rounded-full" style={{ width: `${Math.min(hardPercent, 100)}%` }} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
