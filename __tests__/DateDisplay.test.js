import { render, screen } from '@testing-library/react';
import DateDisplay from '@/components/DateDisplay';

beforeAll(() => {
  const mockDate = new Date('2025-06-13T10:00:00+05:30'); // Enter current date , I chose this for testing
  global.Date = class extends Date {
    constructor() {
      return mockDate;
    }
  };
});

describe('DateDisplay Component', () => {
  it('renders Today\'s Date label', () => {
    render(<DateDisplay />);
    expect(screen.getByText("Today's Date")).toBeInTheDocument();
  });

  it('renders formatted date correctly', () => {
    render(<DateDisplay />);
    expect(screen.getByText(/Friday/)).toBeInTheDocument(); 
    expect(screen.getByText(/13/)).toBeInTheDocument();
  });

  it('renders the Muku avatar', () => {
    render(<DateDisplay />);
    expect(screen.getByText("Muku")).toBeInTheDocument();
  });

  it('renders the Muku sticker image', () => {
    render(<DateDisplay />);
    const image = screen.getByAltText('Muku Sticker');
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute('src', '/muku1.png');
  });
});
