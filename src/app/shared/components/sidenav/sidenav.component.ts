// src/app/shared/components/sidenav/sidenav.component.ts

import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatSidenav, MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';

interface NavItem {
  label: string;
  route: string;
  icon: string;
}

interface NavGroup {
  group: string;
  items: NavItem[];
}

@Component({
  selector: 'app-sidenav',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatSidenavModule,
    MatListModule,
    MatIconModule,
  ],
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss'],
})
export class SidenavComponent implements OnInit {
  @ViewChild(MatSidenav) sidenav!: MatSidenav;

  groupedNavItems: NavGroup[] = [];
  openGroups: Set<string> = new Set();
  isSidenavWide: boolean = true;

  constructor(private sanitizer: DomSanitizer) {}

  ngOnInit(): void {
    this.groupedNavItems = this.getNavItems();
    this.checkSidenavWidth();
    window.addEventListener('resize', () => this.checkSidenavWidth());
  }

  getNavItems(): NavGroup[] {
    return [
      {
        group: 'Main',
        items: [
          { label: 'Dashboard', route: '/', icon: 'dashboard' },
          { label: 'Invoices', route: '/invoices', icon: 'receipt_long' },
          { label: 'Payments', route: '/payments', icon: 'payment' },
          { label: 'Virtual Cards', route: '/virtual-cards', icon: 'credit_card' },
          { label: 'Virtual Accounts', route: '/virtual-accounts', icon: 'account_balance_wallet' },
          { label: 'Reports', route: '/reports', icon: 'bar_chart' },
          { label: 'Settings', route: '/settings', icon: 'settings' },
        ],
      },
      {
        group: 'Support',
        items: [
          { label: 'Help & Support', route: '/help-support', icon: 'help' },
        ],
      },
    ];
  }

  toggleGroup(group: string): void {
    if (this.openGroups.has(group)) {
      this.openGroups.delete(group);
    } else {
      this.openGroups.add(group);
    }
  }

  isGroupOpen(group: string): boolean {
    return this.openGroups.has(group);
  }

  sanitizeGroupId(group: string): string {
    return group.replace(/\s+/g, '-').toLowerCase();
  }

  checkSidenavWidth(): void {
    this.isSidenavWide = window.innerWidth >= 768; 
  }

  toggleSidenav(): void {
    this.sidenav.toggle();
  }
}
