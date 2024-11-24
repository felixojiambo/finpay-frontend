import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

// Define interface for metrics
export interface Metric {
  title: string;
  value: string;
  icon: string;
}

// Define interface for revenue chart data
export interface RevenueChartData {
  labels: string[];
  data: number[];
}

@Injectable({
  providedIn: 'root',
})
export class DashboardService {
  private apiBase = '/api/dashboard'; // Base URL for backend API endpoints

  constructor(private http: HttpClient) {}

  /**
   * Fetch metrics data for the dashboard.
   * @returns Observable<Metric[]> - An observable containing the list of metrics.
   */
  getMetrics(): Observable<Metric[]> {
    return this.http.get<Metric[]>(`${this.apiBase}/metrics`).pipe(
      catchError((error) => {
        console.error('Error fetching metrics:', error);
        // Fallback to default mock data on error
        return of([
          { title: 'Total Revenue', value: '$0', icon: 'attach_money' },
          { title: 'Total Invoices', value: '0', icon: 'receipt' },
          { title: 'Total Payments', value: '0', icon: 'payment' },
        ]);
      })
    );
  }

  /**
   * Fetch revenue data for the revenue growth chart.
   * @returns Observable<RevenueChartData> - An observable containing revenue chart data.
   */
  getRevenueChartData(): Observable<RevenueChartData> {
    return this.http.get<RevenueChartData>(`${this.apiBase}/revenue`).pipe(
      catchError((error) => {
        console.error('Error fetching revenue data:', error);
        // Fallback to default mock data on error
        return of({
          labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
          data: [0, 0, 0, 0, 0, 0],
        });
      })
    );
  }

  /**
   * Fetch additional data for future dashboard widgets or statistics.
   * Placeholder method for extending the service.
   */
  getAdditionalData(): Observable<any> {
    return this.http.get<any>(`${this.apiBase}/additional-data`).pipe(
      catchError((error) => {
        console.error('Error fetching additional data:', error);
        return of({}); // Return an empty object on error
      })
    );
  }
}
