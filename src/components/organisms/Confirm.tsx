import React, { FC, useState, useEffect } from "react";
import { Box, Text, useInput, useFocusManager, useFocus } from "ink";
import useStdoutDimensions from "ink-use-stdout-dimensions";

const Confirm: FC<{ onConfirm: (con: boolean) => void }> = ({ onConfirm }) => {
	const [result, setResult] = useState("");
	const [submit, setSubmited] = useState(false);

	const handleSubmit = (id: string) => {
		onConfirm(id === "continue");
	};

	return (
		<ConfirmWindow
			onSubmit={handleSubmit}
			data={{
				talker: "KK",
				message: ["まだ読めない漢字があるみたいです", "終了しますか？"],
				former: {
					id: "continue",
					label: "続ける",
				},
				latter: {
					id: "quit",
					label: "終わる",
				},
			}}
		/>
	);
};

type ConfirmDataItem = {
	id: string;
	label: string;
};

type ConfirmData = {
	talker: string;
	message: string | string[];
	former: ConfirmDataItem;
	latter: ConfirmDataItem;
};

const ConfirmWindow: FC<{ onSubmit: (id: string) => void; data: ConfirmData }> =
	({ onSubmit, data }) => {
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

		if (width === 0 || height === 0) return null;

		return (
			<Box
				flexDirection="column"
				width={width}
				minHeight={height}
				borderStyle="bold"
				borderColor="white"
			>
				<Box flexGrow={1} justifyContent="center" alignItems="center">
					<Box width="90%" justifyContent="space-between">
						<Item item={data.former} small={width < 70} onFocus={handleFocus} />
						<Item item={data.latter} small={width < 70} onFocus={handleFocus} />
					</Box>
				</Box>
				<Box justifyContent="center">
					<Box width="70%" flexDirection="column">
						<Box>
							<Box
								minHeight={3}
								borderStyle="round"
								borderColor="white"
								paddingX={3}
								marginBottom={-1}
							>
								<Text>{data.talker}</Text>
							</Box>
						</Box>
						<Box
							height={width < 70 ? 4 : 5}
							flexDirection="column"
							borderStyle="round"
							borderColor="white"
							paddingX={2}
						>
							{typeof data.message === "string" ? (
								<Text>{data.message}</Text>
							) : (
								<>
									{data.message.map((m, i) => (
										<Text key={i}>{m}</Text>
									))}
								</>
							)}
						</Box>
					</Box>
				</Box>
			</Box>
		);
	};

const Item: FC<{
	item: ConfirmDataItem;
	small: boolean;
	onFocus: (id: string) => void;
}> = ({ item, small, onFocus }) => {
	const { isFocused } = useFocus();

	useEffect(() => {
		if (isFocused) {
			onFocus(item.id);
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
			<Text>{item.label}</Text>
		</Box>
	);
};

export default Confirm;
