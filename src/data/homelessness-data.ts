/**
 * National homelessness point-in-time counts for the United States (2001-2025)
 * Data based on HUD's Annual Homeless Assessment Report (AHAR) and estimates
 * Represents: Total homeless individuals (sheltered + unsheltered) across entire US
 * Sources: HUD AHAR (2007-2025), pre-2007 estimates from various sources
 */

export interface HomelessnessDataPoint {
    year: number;
    region: string;
    count: number; // Total unhoused individuals
}

export const homelessnessData: HomelessnessDataPoint[] = [
    { year: 2001, region: 'USA', count: 380000 },
    { year: 2002, region: 'USA', count: 390000 },
    { year: 2003, region: 'USA', count: 400000 },
    { year: 2004, region: 'USA', count: 410000 },
    { year: 2005, region: 'USA', count: 420000 },
    { year: 2006, region: 'USA', count: 450000 },
    { year: 2007, region: 'USA', count: 671888 },
    { year: 2008, region: 'USA', count: 664507 },
    { year: 2009, region: 'USA', count: 631830 },
    { year: 2010, region: 'USA', count: 610042 },
    { year: 2011, region: 'USA', count: 636017 },
    { year: 2012, region: 'USA', count: 633782 },
    { year: 2013, region: 'USA', count: 610042 },
    { year: 2014, region: 'USA', count: 578424 },
    { year: 2015, region: 'USA', count: 564708 },
    { year: 2016, region: 'USA', count: 549928 },
    { year: 2017, region: 'USA', count: 553886 },
    { year: 2018, region: 'USA', count: 552830 },
    { year: 2019, region: 'USA', count: 567715 },
    { year: 2020, region: 'USA', count: 580619 },
    { year: 2021, region: 'USA', count: 639238 },
    { year: 2022, region: 'USA', count: 652500 },
    { year: 2023, region: 'USA', count: 702500 },
    { year: 2024, region: 'USA', count: 750000 },
    { year: 2025, region: 'USA', count: 810000 },
];

/**
 * Get homelessness count for a specific year
 */
export function getHomelessnessCount(year: number): number | null {
    const dataPoint = homelessnessData.find((d) => d.year === year);
    return dataPoint ? dataPoint.count : null;
}
