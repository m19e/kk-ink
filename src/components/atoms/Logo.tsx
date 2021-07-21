import React from "react";
import { Box, Text } from "ink";
import Gradient from "ink-gradient";
import BigText from "ink-big-text";

const Logo = () => (
	<Box paddingX={2} alignItems="center">
		<Box marginRight={2}>
			<Gradient name="fruit">
				<BigText text="kk" />
			</Gradient>
		</Box>
		<Box paddingBottom={1}>
			<Box borderStyle="round" paddingX={2}>
				<Text bold>CLI tool for Kanji check</Text>
			</Box>
		</Box>
	</Box>
);

export default Logo;
