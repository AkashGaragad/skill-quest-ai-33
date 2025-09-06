import { Calendar, Flame, Trophy, Target } from "lucide-react";

const StreakTracker = () => {
  const currentStreak = 12;
  const weeklyGoal = 5;
  const thisWeekCompleted = 4;

  const weekDays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  const completedDays = [true, true, false, true, true, false, false];

  const achievements = [
    { title: "First Week", icon: "🎯", completed: true },
    { title: "10 Day Streak", icon: "🔥", completed: true },
    { title: "20 Day Streak", icon: "⚡", completed: false },
    { title: "Month Master", icon: "👑", completed: false }
  ];

  return (
    <div className="bg-gradient-card rounded-2xl p-6 shadow-medium border border-border">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-semibold text-foreground flex items-center gap-2">
          <Flame className="w-5 h-5 text-orange-500" />
          Weekly Streaks
        </h3>
        <div className="flex items-center gap-2 text-2xl font-bold text-orange-500">
          <span>{currentStreak}</span>
          <Flame className="w-6 h-6" />
        </div>
      </div>

      {/* Weekly Progress */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-3">
          <span className="text-sm font-medium text-muted-foreground">This Week Progress</span>
          <span className="text-sm font-semibold text-foreground">{thisWeekCompleted}/{weeklyGoal} days</span>
        </div>
        
        <div className="grid grid-cols-7 gap-2 mb-4">
          {weekDays.map((day, index) => (
            <div key={day} className="text-center">
              <div className="text-xs text-muted-foreground mb-1">{day}</div>
              <div 
                className={`w-8 h-8 rounded-lg flex items-center justify-center text-xs font-medium ${
                  completedDays[index] 
                    ? 'bg-gradient-success text-white' 
                    : 'bg-muted text-muted-foreground'
                }`}
              >
                {completedDays[index] ? '✓' : '○'}
              </div>
            </div>
          ))}
        </div>

        <div className="w-full bg-muted rounded-full h-2">
          <div 
            className="bg-gradient-success h-2 rounded-full transition-all duration-500"
            style={{ width: `${(thisWeekCompleted / weeklyGoal) * 100}%` }}
          />
        </div>
      </div>

      {/* Achievements */}
      <div>
        <h4 className="text-sm font-semibold text-foreground mb-3 flex items-center gap-2">
          <Trophy className="w-4 h-4 text-warning" />
          Achievements
        </h4>
        <div className="grid grid-cols-2 gap-3">
          {achievements.map(({ title, icon, completed }) => (
            <div 
              key={title}
              className={`p-3 rounded-lg border transition-all duration-300 ${
                completed 
                  ? 'bg-success/10 border-success/20 text-success' 
                  : 'bg-muted/50 border-border text-muted-foreground'
              }`}
            >
              <div className="text-lg mb-1">{icon}</div>
              <div className="text-xs font-medium">{title}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default StreakTracker;