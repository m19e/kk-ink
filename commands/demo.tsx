import React, { FC, useState, useEffect } from "react";
import { Box, Text, useInput, useFocusManager, useFocus } from "ink";

/// Focus demo command
const Focus = () => {
	const [focus, setFocus] = useState<undefined | string>(undefined);
	const fm = useFocusManager();

	useInput((_, key) => {
		if (key.rightArrow) {
			fm.focusNext();
		} else if (key.leftArrow) {
			fm.focusPrevious();
		} else if (key.escape) {
			setFocus(undefined);
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
			<Box>
				<Item label="First" onFocus={handleFocus} />
				<Item label="Second" onFocus={handleFocus} />
				<Item label="Third" onFocus={handleFocus} />
				<Box padding={2}>
					<Text>{focus && focus}</Text>
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
