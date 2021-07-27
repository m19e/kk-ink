import React, { FC, useState, useEffect } from "react";
import { Box, Text, useInput, useFocusManager, useFocus } from "ink";

/// Focus demo command
const Demo = () => {
	const [result, setResult] = useState("");
	const [submit, setSubmited] = useState(false);

	const handleSubmit = (id: string) => {
		setResult(id);
		setSubmited(true);
	};

	if (submit) return <Text>result is {result}!</Text>;

	return <Focus onSubmit={handleSubmit} />;
};

const Focus: FC<{ onSubmit: (id: string) => void }> = ({ onSubmit }) => {
	const [focus, setFocus] = useState<undefined | string>(undefined);
	const [canSubmit, setCanSubmit] = useState(false);
	const { focusNext, focusPrevious } = useFocusManager();
	const [width, setWidth] = useState(0);
	const [height, setHeight] = useState(0);

	useEffect(() => {
		setWidth(process.stdout.columns);
		setHeight(process.stdout.rows);
	}, []);

	useInput((_, key) => {
		if (key.rightArrow) {
			focusNext();
			setCanSubmit(true);
		} else if (key.leftArrow) {
			focusPrevious();
			setCanSubmit(true);
		} else if (key.escape) {
			setCanSubmit(false);
		} else if (key.return) {
			if (canSubmit) onSubmit(focus);
		}
	});

	const handleFocus = (id: string) => {
		setFocus(id);
	};

	return (
		<Box
			flexDirection="column"
			justifyContent="space-between"
			width={Math.min(80, width)}
			height={Math.min(height, 20, width / 4)}
			borderStyle="bold"
			borderColor="white"
		>
			{/* <Box marginBottom={1}>
				<Text>
					Press Tab to focus next element, Shift+Tab to focus previous element,
					Esc to reset focus.
				</Text>
			</Box> */}
			<Box flexGrow={1} justifyContent="center" alignItems="center">
				<Box width="90%" justifyContent="space-between">
					<Item label="いいよ" onFocus={handleFocus} />
					<Item label="ごめん" onFocus={handleFocus} />
				</Box>
			</Box>
			<Box justifyContent="center">
				<Box width="70%" flexDirection="column">
					<Box>
						<Box
							minHeight={3}
							borderStyle="round"
							paddingX={4}
							marginBottom={-1}
						>
							<Text>めぐる{width}</Text>
						</Box>
					</Box>
					<Box height={5} borderStyle="round" paddingX={2}>
						<Text>お休み、もらっちゃダメかな？</Text>
					</Box>
				</Box>
			</Box>
		</Box>
	);
};

const Item: FC<{
	label: string;
	small: boolean;
	onFocus: (id: string) => void;
}> = ({ label, small, onFocus }) => {
	const { isFocused } = useFocus();

	useEffect(() => {
		if (isFocused) {
			onFocus(label);
		}
	}, [isFocused]);

	return (
		<Box
			paddingX={small ? 4 : 7}
			paddingY={small ? 1 : 2}
			justifyContent="center"
			borderStyle="round"
			borderColor={isFocused ? "green" : "white"}
		>
			<Text>{label}</Text>
		</Box>
	);
};

export default Demo;
