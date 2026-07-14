// JTC B2B Customer Mobile App — Design System
// Pixel-perfect tokens extracted from design reference screenshots

export const Theme = {
  colors: {
    // Primary brand colors
    primary: '#1B3A7C',        // Dark navy blue (headers, primary buttons)
    primaryDark: '#0E2344',    // Darker navy (splash bg, status bar)
    primaryLight: '#2D5BB9',   // Lighter blue (active tab, links)
    primarySoft: '#E8EEF8',   // Very light blue (selected backgrounds)

    // Accent
    accent: '#F5851F',         // Orange (highlights, badges, CTA)
    accentLight: '#FFF3E6',   // Light orange background

    // Backgrounds
    bgMain: '#F5F7FA',        // Light grey page background
    bgCard: '#FFFFFF',        // White card surfaces
    bgDark: '#0E2344',        // Dark blue sections

    // Text
    textDark: '#1A1A2E',      // Primary text
    textBody: '#374151',      // Body text
    textMuted: '#6B7280',     // Secondary text
    textLight: '#9CA3AF',     // Placeholder, hints
    textWhite: '#FFFFFF',     // White text on dark

    // Status badges
    success: '#16A34A',        // Confirmed, Delivered
    successBg: '#DCFCE7',     // Green badge background
    warning: '#F59E0B',        // Packed, Pending
    warningBg: '#FEF3C7',     // Yellow badge background
    error: '#DC2626',          // Cancelled
    errorBg: '#FEE2E2',       // Red badge background
    info: '#2563EB',           // Invoice Generated
    infoBg: '#DBEAFE',        // Blue badge background

    // Surfaces
    white: '#FFFFFF',
    border: '#E5E7EB',        // Card borders, dividers
    borderLight: '#F3F4F6',   // Subtle dividers
    inputBg: '#F9FAFB',      // Input field backgrounds
    inputBorder: '#D1D5DB',   // Input borders

    // Tab bar
    tabActive: '#2563EB',     // Active tab icon
    tabInactive: '#9CA3AF',   // Inactive tab icon
  },

  fonts: {
    heading: 'Poppins-Bold',
    headingSemiBold: 'Poppins-SemiBold',
    body: 'Inter-Regular',
    bodyMedium: 'Inter-Medium',
    bodySemiBold: 'Inter-SemiBold',
    bodyBold: 'Inter-Bold',
  },

  fontSize: {
    xs: 10,
    sm: 12,
    md: 14,
    lg: 16,
    xl: 18,
    xxl: 22,
    xxxl: 28,
    hero: 32,
  },

  spacing: {
    xs: 4,
    sm: 8,
    md: 12,
    lg: 16,
    xl: 20,
    xxl: 24,
    xxxl: 32,
  },

  radii: {
    sm: 6,
    md: 8,
    lg: 12,
    xl: 16,
    xxl: 20,
    full: 999,
    card: 12,
    button: 8,
    input: 8,
    badge: 6,
    chip: 20,
  },

  shadows: {
    card: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.05,
      shadowRadius: 3,
      elevation: 2,
    },
    cardMd: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.08,
      shadowRadius: 6,
      elevation: 4,
    },
    button: {
      shadowColor: '#1B3A7C',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.15,
      shadowRadius: 4,
      elevation: 3,
    },
  },
};
