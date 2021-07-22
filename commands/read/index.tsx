import React, { useState } from "react";
import PropTypes from "prop-types";
import { useApp, useInput, Box, Text } from "ink";
import ReadCmd from "../../src/components/templates/Read";

type Props = {
	file: string;
};

/// Read file command
const Read = ({ file }: Props) => <ReadCmd file={file} />;

Read.propTypes = {
	/// Name of target file name
	file: PropTypes.string,
};

Read.positionalArgs = ["file"];

export default Read;
