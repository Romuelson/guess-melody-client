type MistakesProps = {
	count: number;
};

function Mistakes({ count }: MistakesProps) {
	const mistakes = Array.from({ length: count }, () => '');

	return (
		<div className="game__mistakes">
			{mistakes.map((_item, index) => {
				const keyValue = `mistakes-${index}`;
				return <div key={keyValue} className="wrong" />;
			})}
		</div>
	);
}

export default Mistakes;
