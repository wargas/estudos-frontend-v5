type Props = {
  respondidas: any[];
};

export default function Stats({ respondidas }: Props) {
  const total = respondidas.length;

  return (
    <div className="flex gap-2">
      {Array(total >= 10 ? 0 : 10-total)
        .fill("")
        .map((_, index) => (
          <StatItem key={index} color="gray" />
        ))}
      {respondidas?.map((item: any) => (
        <StatItem key={item.id} color={item.acertou ? "green" : "red"} />
      ))}
    </div>
  );
}

type StateProps = {
  color: "red" | "green" | "gray";
};

function StatItem({ color }: StateProps) {

    const bgClasses = {
        red: 'bg-red-500',
        green: 'bg-green-500',
        gray: 'bg-gray-200'
    }

  return <div className={`cursor-pointer w-4 h-4 rounded-full ${bgClasses[color]}`}></div>;
}
