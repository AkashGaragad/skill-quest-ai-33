import { useState } from "react";
import { Plus, Calendar, Flag, CheckCircle, Circle, Flame } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTodos } from "@/hooks/useTodos";
import { useAuth } from "@/hooks/useAuth";

const Todo = () => {
  const [newTask, setNewTask] = useState("");
  const { user } = useAuth();
  const { todos, loading, addTodo, toggleTodo, deleteTodo } = useTodos();

  if (!user) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-foreground mb-4">Please log in</h2>
          <p className="text-muted-foreground">You need to be logged in to manage your tasks.</p>
        </div>
      </div>
    );
  }

  const currentStreak = 12; // This could come from user stats

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high": return "text-destructive";
      case "medium": return "text-warning";
      case "low": return "text-success";
      default: return "text-muted-foreground";
    }
  };

  const getPriorityBg = (priority: string) => {
    switch (priority) {
      case "high": return "bg-destructive/10 border-destructive/20";
      case "medium": return "bg-warning/10 border-warning/20";
      case "low": return "bg-success/10 border-success/20";
      default: return "bg-muted/10 border-border";
    }
  };

  const handleAddTask = async () => {
    if (!newTask.trim()) return;
    
    await addTodo(newTask);
    setNewTask("");
  };

  const TaskCard = ({ task, columnKey }: { task: any, columnKey: string }) => (
    <div className={`p-4 rounded-lg border transition-all duration-300 hover:shadow-medium ${
      task.completed ? 'bg-success/5 border-success/20' : 'bg-gradient-card border-border'
    }`}>
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-start gap-3 flex-1">
            <button 
              onClick={() => toggleTodo(task.id, columnKey)}
              className="mt-0.5 hover:scale-110 transition-transform"
            >
              {task.completed ? (
                <CheckCircle className="w-5 h-5 text-success" />
              ) : (
                <Circle className="w-5 h-5 text-muted-foreground hover:text-primary" />
              )}
            </button>
            <div className="flex-1">
              <h4 className={`font-medium ${task.completed ? 'line-through text-muted-foreground' : 'text-foreground'}`}>
                {task.title}
              </h4>
              <div className="flex items-center gap-4 mt-2 text-sm">
                <span className="flex items-center gap-1 text-muted-foreground">
                  <Calendar className="w-3 h-3" />
                  {task.due_date || 'No due date'}
                </span>
                <span className={`flex items-center gap-1 ${getPriorityColor(task.priority)}`}>
                  <Flag className="w-3 h-3" />
                  {task.priority}
                </span>
              </div>
            </div>
          </div>
        </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Header with Streak */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 animate-fade-in">
          <div>
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-2">
              Task <span className="bg-gradient-hero bg-clip-text text-transparent">Manager</span>
            </h1>
            <p className="text-xl text-muted-foreground">Stay organized and maintain your learning momentum</p>
          </div>
          
          <div className="flex items-center gap-4 mt-4 sm:mt-0">
            <div className="flex items-center gap-2 bg-gradient-card rounded-xl px-4 py-2 shadow-soft border border-border">
              <Flame className="w-5 h-5 text-orange-500" />
              <span className="text-lg font-bold text-foreground">{currentStreak}</span>
              <span className="text-sm text-muted-foreground">day streak</span>
            </div>
          </div>
        </div>

        {/* Add New Task */}
        <div className="bg-gradient-card rounded-2xl p-6 shadow-soft border border-border mb-8 animate-slide-up">
          <h3 className="text-lg font-semibold text-foreground mb-4">Add New Task</h3>
          <div className="flex gap-4">
            <input
              type="text"
              value={newTask}
              onChange={(e) => setNewTask(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleAddTask()}
              placeholder="What do you want to learn today?"
              className="flex-1 px-4 py-3 rounded-xl border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
              disabled={loading}
            />
            <Button onClick={handleAddTask} variant="hero" className="px-6" disabled={loading}>
              <Plus className="w-4 h-4 mr-2" />
              Add Task
            </Button>
          </div>
        </div>

        {/* Kanban Board */}
        <div className="grid lg:grid-cols-3 gap-8 animate-slide-up" style={{ animationDelay: "0.2s" }}>
          
          {/* This Week Column */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold text-foreground">This Week</h2>
              <span className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm font-medium">
                {todos.thisWeek.length}
              </span>
            </div>
            <div className="space-y-3">
              {todos.thisWeek.map(task => (
                <TaskCard key={task.id} task={task} columnKey="thisWeek" />
              ))}
              {todos.thisWeek.length === 0 && (
                <div className="text-center py-8 text-muted-foreground">
                  <CheckCircle className="w-12 h-12 mx-auto mb-2 opacity-50" />
                  <p>All caught up! Add some new tasks.</p>
                </div>
              )}
            </div>
          </div>

          {/* In Progress Column */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold text-foreground">In Progress</h2>
              <span className="bg-warning/10 text-warning px-3 py-1 rounded-full text-sm font-medium">
                {todos.inProgress.length}
              </span>
            </div>
            <div className="space-y-3">
              {todos.inProgress.map(task => (
                <TaskCard key={task.id} task={task} columnKey="inProgress" />
              ))}
              {todos.inProgress.length === 0 && (
                <div className="text-center py-8 text-muted-foreground">
                  <Circle className="w-12 h-12 mx-auto mb-2 opacity-50" />
                  <p>No tasks in progress</p>
                </div>
              )}
            </div>
          </div>

          {/* Completed Column */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold text-foreground">Completed</h2>
              <span className="bg-success/10 text-success px-3 py-1 rounded-full text-sm font-medium">
                {todos.completed.length}
              </span>
            </div>
            <div className="space-y-3">
              {todos.completed.map(task => (
                <TaskCard key={task.id} task={task} columnKey="completed" />
              ))}
              {todos.completed.length === 0 && (
                <div className="text-center py-8 text-muted-foreground">
                  <CheckCircle className="w-12 h-12 mx-auto mb-2 opacity-50" />
                  <p>No completed tasks yet</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Todo;