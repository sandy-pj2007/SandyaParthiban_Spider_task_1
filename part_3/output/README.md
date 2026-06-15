# Part 3 – TinyXML2 Fuzzing with AFL++

## Design Rationale

For this task, TinyXML2 was selected as the target application because it is a widely used open-source XML parser written in C++. XML parsers process complex, structured input and are therefore good candidates for fuzz testing. AFL++ was chosen as the fuzzing framework due to its effectiveness in coverage-guided fuzzing and its ability to automatically generate diverse test cases.

A custom harness was developed to read XML files supplied by AFL++ and pass them to TinyXML2 for parsing. The harness was intentionally kept simple to maximize execution speed and allow AFL++ to explore a larger number of input variations.

## Observations

The target was compiled using AFL++ instrumentation to enable coverage tracking during fuzzing. A small seed corpus containing valid XML files was provided as the initial input set. AFL++ was then executed against the custom harness for several hours, during which it generated hundreds of additional test cases and explored new execution paths within the parser.

The focus of the project was to validate the fuzzing workflow, evaluate code coverage growth, and identify potential crashes or hangs. During the fuzzing campaign, AFL++ successfully expanded the corpus and discovered new paths, although no crashes or vulnerabilities were observed.

video of the fuzzy loop showing progress : https://drive.google.com/file/d/16neNKM61sOreTc8-EGsOdtx2de82GooT/view?usp=drive_link

