interface EthernetCableProps {
  position: 'top' | 'bottom';
}

export default function EthernetCable({ position }: EthernetCableProps) {
  const isTop = position === 'top';

  return (
    <div
      className={`cable-layer ${isTop ? 'cable-top' : 'cable-bottom'}`}
      aria-hidden="true"
    >
      <div className="cable-img"></div>
    </div>
  );
}
