import React, { FC, useState, useEffect } from "react";
import { Box, Text, useInput, useFocusManager, useFocus } from "ink";
import useStdoutDimensions from "ink-use-stdout-dimensions";

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
	const [w, h] = useStdoutDimensions();

	useEffect(() => {
		if (w < h * 4) {
			setWidth(Math.min(80, w));
			setHeight(Math.min(h, 20, w / 4));
		} else {
			setWidth(Math.min(w, 80, h * 4));
			setHeight(Math.min(h, 20));
		}
	}, [w, h]);

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
			width={width}
			minHeight={height}
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
					<Item label="いいよ" small={width < 70} onFocus={handleFocus} />
					<Item label="ごめん" small={width < 70} onFocus={handleFocus} />
				</Box>
			</Box>
			<Box justifyContent="center">
				<Box width="70%" flexDirection="column">
					<Box>
						<Box
							minHeight={3}
							borderStyle="round"
							borderColor="white"
							paddingX={4}
							marginBottom={-1}
						>
							<Text>めぐる{[width, height]}</Text>
						</Box>
					</Box>
					<Box
						height={width < 70 ? 4 : 5}
						borderStyle="round"
						borderColor="white"
						paddingX={2}
					>
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
