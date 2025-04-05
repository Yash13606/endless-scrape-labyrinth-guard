
import React from 'react';
import { Link } from 'react-router-dom';
import { SidebarProvider, Sidebar, SidebarContent, SidebarGroup, SidebarHeader, SidebarFooter } from '@/components/ui/sidebar';
import { Activity, BarChart3, Server, List, Database, Settings, ShieldAlert } from 'lucide-react';

export const AppSidebar = () => {
  return (
    <Sidebar className="border-r border-abyss-700">
      <SidebarHeader className="px-6 py-3">
        <Link to="/" className="flex items-center space-x-2">
          <ShieldAlert className="h-6 w-6 text-neon-blue" />
          <span className="text-lg font-bold">Perpetual Abyss</span>
        </Link>
      </SidebarHeader>
      
      <SidebarContent>
        <SidebarGroup>
          <nav className="grid gap-1 px-2">
            <Link to="/" className="flex items-center gap-3 rounded-md px-3 py-2 text-muted-foreground hover:bg-secondary hover:text-foreground">
              <Activity className="h-4 w-4" />
              <span>Home</span>
            </Link>
            
            <Link to="/dashboard" className="flex items-center gap-3 rounded-md px-3 py-2 text-muted-foreground hover:bg-secondary hover:text-foreground">
              <BarChart3 className="h-4 w-4" />
              <span>Dashboard</span>
            </Link>
            
            <Link to="/honeypot" className="flex items-center gap-3 rounded-md px-3 py-2 text-muted-foreground hover:bg-secondary hover:text-foreground">
              <Server className="h-4 w-4" />
              <span>Honeypot</span>
            </Link>

            <Link to="/results" className="flex items-center gap-3 rounded-md px-3 py-2 bg-secondary text-foreground">
              <List className="h-4 w-4" />
              <span>Results</span>
            </Link>

            <Link to="/data-management" className="flex items-center gap-3 rounded-md px-3 py-2 text-muted-foreground hover:bg-secondary hover:text-foreground">
              <Database className="h-4 w-4" />
              <span>Data Management</span>
            </Link>

            <Link to="/settings" className="flex items-center gap-3 rounded-md px-3 py-2 text-muted-foreground hover:bg-secondary hover:text-foreground">
              <Settings className="h-4 w-4" />
              <span>Settings</span>
            </Link>
          </nav>
        </SidebarGroup>
      </SidebarContent>
      
      <SidebarFooter className="border-t border-abyss-700 p-4">
        <div className="text-xs text-muted-foreground">
          Perpetual Abyss v1.0
        </div>
      </SidebarFooter>
    </Sidebar>
  );
};
