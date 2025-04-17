import asyncio
from agents.core_agent import CoreAgent
from core.tracker import ValueTracker
from core.task_queue import TaskQueue

class SwarmManager:
    def __init__(self, initial_agents=1):
        self.agents = []
        self.tracker = ValueTracker()
        self.task_queue = TaskQueue()
        self.total_value = 0.0
        
    async def spawn_agent(self):
        agent_id = len(self.agents) + 1
        agent = CoreAgent(agent_id)
        self.agents.append(agent)
        
    async def run_forever(self):
        # Spawn initial agents
        for _ in range(self.initial_agents):
            await self.spawn_agent()
        
        while True:
            # Distribute tasks to agents
            for agent in self.agents:
                if self.task_queue.has_tasks():
                    task = self.task_queue.get_next()
                    result = await agent.run_task(task.type, task.params)
                    self.tracker.log_task(agent.id, task, result)
                    self.total_value += result.get('value', 0.0)
                    
            # Check spawn logic
            if self.total_value > 100 * len(self.agents):
                await self.spawn_agent()
                
            await asyncio.sleep(1)