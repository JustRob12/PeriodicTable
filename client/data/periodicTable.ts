export interface Element {
  symbol: string;
  name: string;
  atomicNumber: number;
  category: string;
  color?: string;
}

export const elements: Element[] = [
  { symbol: 'H', name: 'Hydrogen', atomicNumber: 1, category: 'Nonmetal', color: '#FF8C00' },
  { symbol: 'He', name: 'Helium', atomicNumber: 2, category: 'Noble Gas', color: '#FF1493' },
  { symbol: 'Li', name: 'Lithium', atomicNumber: 3, category: 'Alkali Metal', color: '#FF69B4' },
  { symbol: 'Be', name: 'Beryllium', atomicNumber: 4, category: 'Alkaline Earth Metal', color: '#DDA0DD' },
  { symbol: 'B', name: 'Boron', atomicNumber: 5, category: 'Metalloid', color: '#98FB98' },
  { symbol: 'C', name: 'Carbon', atomicNumber: 6, category: 'Nonmetal', color: '#FF8C00' },
  { symbol: 'N', name: 'Nitrogen', atomicNumber: 7, category: 'Nonmetal', color: '#FF8C00' },
  { symbol: 'O', name: 'Oxygen', atomicNumber: 8, category: 'Nonmetal', color: '#FF8C00' },
  { symbol: 'F', name: 'Fluorine', atomicNumber: 9, category: 'Halogen', color: '#00FF00' },
  { symbol: 'Ne', name: 'Neon', atomicNumber: 10, category: 'Noble Gas', color: '#FF1493' },
  // Add more elements as needed
];
