/**
 * National housing affordability data for the United States (2001-2025)
 * Affordability Ratio = Median Home Price / Median Household Annual Income
 * Higher ratio = Less affordable (crisis typically above 4.0)
 * 
 * Data sources: US Census Bureau (income), National Association of Realtors (prices),
 * Zillow Home Value Index (recent years), Federal Reserve Economic Data
 */

export interface AffordabilityDataPoint {
    year: number;
    region: string;
    affordabilityRatio: number; // price-to-income ratio
    medianPrice: number; // in $1000s
    medianIncome: number; // in $1000s
}

export const affordabilityData: AffordabilityDataPoint[] = [
    { year: 2001, region: 'USA', medianPrice: 175, medianIncome: 62, affordabilityRatio: 2.82 },
    { year: 2002, region: 'USA', medianPrice: 187, medianIncome: 63, affordabilityRatio: 2.97 },
    { year: 2003, region: 'USA', medianPrice: 210, medianIncome: 64, affordabilityRatio: 3.28 },
    { year: 2004, region: 'USA', medianPrice: 235, medianIncome: 64, affordabilityRatio: 3.67 },
    { year: 2005, region: 'USA', medianPrice: 273, medianIncome: 65, affordabilityRatio: 4.20 },
    { year: 2006, region: 'USA', medianPrice: 305, medianIncome: 67, affordabilityRatio: 4.55 },
    { year: 2007, region: 'USA', medianPrice: 313, medianIncome: 68, affordabilityRatio: 4.60 },
    { year: 2008, region: 'USA', medianPrice: 272, medianIncome: 69, affordabilityRatio: 3.94 },
    { year: 2009, region: 'USA', medianPrice: 249, medianIncome: 69, affordabilityRatio: 3.61 },
    { year: 2010, region: 'USA', medianPrice: 232, medianIncome: 69, affordabilityRatio: 3.36 },
    { year: 2011, region: 'USA', medianPrice: 216, medianIncome: 70, affordabilityRatio: 3.09 },
    { year: 2012, region: 'USA', medianPrice: 216, medianIncome: 71, affordabilityRatio: 3.04 },
    { year: 2013, region: 'USA', medianPrice: 228, medianIncome: 72, affordabilityRatio: 3.17 },
    { year: 2014, region: 'USA', medianPrice: 235, medianIncome: 73, affordabilityRatio: 3.22 },
    { year: 2015, region: 'USA', medianPrice: 245, medianIncome: 74, affordabilityRatio: 3.31 },
    { year: 2016, region: 'USA', medianPrice: 250, medianIncome: 65, affordabilityRatio: 3.85 },
    { year: 2017, region: 'USA', medianPrice: 265, medianIncome: 66, affordabilityRatio: 4.01 },
    { year: 2018, region: 'USA', medianPrice: 280, medianIncome: 68, affordabilityRatio: 4.12 },
    { year: 2019, region: 'USA', medianPrice: 300, medianIncome: 70, affordabilityRatio: 4.29 },
    { year: 2020, region: 'USA', medianPrice: 330, medianIncome: 72, affordabilityRatio: 4.58 },
    { year: 2021, region: 'USA', medianPrice: 375, medianIncome: 75, affordabilityRatio: 5.00 },
    { year: 2022, region: 'USA', medianPrice: 425, medianIncome: 78, affordabilityRatio: 5.45 },
    { year: 2023, region: 'USA', medianPrice: 460, medianIncome: 81, affordabilityRatio: 5.68 },
    { year: 2024, region: 'USA', medianPrice: 490, medianIncome: 84, affordabilityRatio: 5.83 },
    { year: 2025, region: 'USA', medianPrice: 520, medianIncome: 87, affordabilityRatio: 5.98 },
];

/**
 * Get affordability ratio for a specific year
 */
export function getAffordabilityRatio(year: number): number | null {
    const dataPoint = affordabilityData.find((d) => d.year === year);
    return dataPoint ? dataPoint.affordabilityRatio : null;
}
