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
	const { focusNext, focusPrevious } = useFocusManager();

	useInput((_, key) => {
		if (key.rightArrow) {
			focusNext();
		} else if (key.leftArrow) {
			focusPrevious();
		} else if (key.escape) {
			setFocus(undefined);
		} else if (key.return) {
			if (typeof focus === "undefined") return;
			onSubmit(focus);
		}
	});

	const handleFocus = (id: string) => {
		setFocus(id);
	};

	return (
		<Box flexDirection="column" padding={1}>
			<Box marginBottom={1}>
				<Text>
					Press Tab to focus next element, Shift+Tab to focus previous element,
					Esc to reset focus.
				</Text>
			</Box>
			<Box width="80%" justifyContent="space-around">
				<Item label=" はい " onFocus={handleFocus} />
				<Item label="いいえ" onFocus={handleFocus} />
				{/* <Box padding={2}>
					<Text>{focus && focus}</Text>
				</Box> */}
			</Box>
		</Box>
	);
};

const Item: FC<{ label: string; onFocus: (id: string) => void }> = ({
	label,
	onFocus,
}) => {
	const { isFocused } = useFocus();

	useEffect(() => {
		if (isFocused) {
			onFocus(label);
		}
	}, [isFocused]);

	return (
		<Box
			paddingX={4}
			paddingY={1}
			justifyContent="center"
			borderStyle="round"
			borderColor={isFocused ? "green" : "white"}
		>
			<Text>{label}</Text>
		</Box>
	);
};

export default Demo;
