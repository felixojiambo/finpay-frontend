import { CommonModule } from '@angular/common';
import { Component, OnInit, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatIconModule } from '@angular/material/icon';
import { Chart, ChartConfiguration, ChartType, registerables } from 'chart.js';
import { Metric, DashboardService, RevenueChartData } from '../../core/services/dashboard.service';
import { forkJoin } from 'rxjs';

// Register Chart.js components
Chart.register(...registerables);

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    MatProgressSpinnerModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
  ],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit, AfterViewInit {
  metrics: Metric[] = [];
  isLoading: boolean = true;
  errorMessage: string = '';

  // Reference to the canvas element
  @ViewChild('revenueChart') revenueChartRef!: ElementRef<HTMLCanvasElement>;

  // Chart instance
  revenueChart!: Chart;

  constructor(private dashboardService: DashboardService) {}

  ngOnInit(): void {
    // Intentionally left blank
  }

  ngAfterViewInit(): void {
    this.fetchDashboardData();
  }

  /**
   * Fetches all necessary data for the dashboard using forkJoin.
   */
  fetchDashboardData(): void {
    forkJoin({
      metrics: this.dashboardService.getMetrics(),
      revenueData: this.dashboardService.getRevenueChartData(),
    }).subscribe({
      next: (result) => {
        this.metrics = result.metrics;
        this.isLoading = false;

        // Initialize the chart after data is fetched and view is initialized
        this.initializeRevenueChart(result.revenueData);
      },
      error: (error) => {
        console.error('Error fetching dashboard data:', error);
        this.errorMessage = 'Failed to load dashboard data.';
        this.isLoading = false;
      },
    });
  }

  /**
   * Initializes the revenue chart using chart.js.
   * @param revenueData - The data for the revenue chart.
   */
  initializeRevenueChart(revenueData: RevenueChartData): void {
    const ctx = this.revenueChartRef.nativeElement.getContext('2d');
    if (ctx) {
      this.revenueChart = new Chart(ctx, {
        type: 'bar', // Specify the chart type
        data: {
          labels: revenueData.labels,
          datasets: [
            {
              label: 'Monthly Revenue',
              data: revenueData.data,
              backgroundColor: 'rgba(75, 192, 192, 0.5)',
              borderColor: 'rgba(75, 192, 192, 1)',
              borderWidth: 1,
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              position: 'top' as const,
            },
            title: {
              display: true,
              text: 'Revenue Growth',
            },
          },
          scales: {
            y: {
              beginAtZero: true,
            },
          },
        },
      });
    } else {
      console.error('Cannot get canvas context');
    }
  }
}
