import React, { FC, useState, useEffect } from "react";
import { Box, Text, useInput, useFocusManager, useFocus } from "ink";

/// Focus demo command
const Focus = () => {
	const [input, setInput] = useState("initial");
	const fm = useFocusManager();

	useInput((_, key) => {
		if (key.rightArrow) {
			fm.focusNext();
			setInput("→");
		} else if (key.leftArrow) {
			fm.focusPrevious();
			setInput("←");
		} else if (key.tab) {
			setInput((key.shift ? "shift + " : "") + "tab");
		}
	});

	return (
		<Box flexDirection="column" padding={1}>
			<Box marginBottom={1}>
				<Text>
					Press Tab to focus next element, Shift+Tab to focus previous element,
					Esc to reset focus.
				</Text>
			</Box>
			<Box>
				<Item label="First" />
				<Item label="Second" />
				<Item label="Third" />
				<Box padding={2}>
					<Text>{input}</Text>
				</Box>
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
			paddingX={3}
			paddingY={1}
			justifyContent="center"
			borderStyle="round"
			borderColor={isFocused ? "green" : undefined}
		>
			<Text>{label}</Text>
		</Box>
	);
};

export default Focus;
