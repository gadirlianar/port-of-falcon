/**
 * Port of Falcon — Utility Functions
 * Path: src/lib/utils.ts
 */

import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Merges Tailwind class names safely with clsx and twMerge.
 */
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}

/**
 * Formats a numeric value with specified decimal precision and optional unit.
 */
export function formatMetric(val: number, decimals = 1, unit = ''): string {
  if (isNaN(val) || !isFinite(val)) return '—';
  const formatted = val.toFixed(decimals);
  return unit ? `${formatted} ${unit}` : formatted;
}

/**
 * Formats optical insertion loss in decibels (dB) with 3 decimal precision.
 */
export function formatOpticalLoss(lossDb: number): string {
  if (isNaN(lossDb)) return '— dB';
  return `${lossDb.toFixed(3)} dB`;
}

/**
 * Formats temperature in Celsius with 1 decimal precision.
 */
export function formatTemp(tempC: number): string {
  if (isNaN(tempC)) return '— °C';
  return `${tempC.toFixed(1)}°C`;
}

/**
 * Formats relative humidity in percent.
 */
export function formatHumidity(rh: number): string {
  if (isNaN(rh)) return '— %';
  return `${rh.toFixed(1)}% RH`;
}

/**
 * Formats currency in USD.
 */
export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  }).format(amount);
}

/**
 * Formats ratio or probability to percent string (e.g. 0.842 -> "84.2%").
 */
export function formatPercent(val: number, decimals = 1): string {
  if (isNaN(val)) return '—%';
  return `${(val * 100).toFixed(decimals)}%`;
}

/**
 * Formats uptime seconds into human-readable format (e.g. 97d 14h 22m).
 */
export function formatUptime(seconds: number): string {
  if (!seconds || seconds <= 0) return '0m';
  const days = Math.floor(seconds / 86400);
  const hours = Math.floor((seconds % 86400) / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);

  if (days > 0) return `${days}d ${hours}h ${minutes}m`;
  if (hours > 0) return `${hours}h ${minutes}m`;
  return `${minutes}m`;
}
