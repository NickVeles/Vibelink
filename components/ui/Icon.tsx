import * as React from "react"
import Svg, { Path } from "react-native-svg"

const DEFAULT_SIZE = 24;
const DEFAULT_STROKE = "#f2f2f2";
const DEFAULT_STROKE_WIDTH = 1.5;

interface SvgComponentProps {
  height?: number;
  width?: number;
  stroke?: string;
  strokeWidth?: number;
}

export const LogoTitleIcon = ({ height, width, stroke, strokeWidth }: SvgComponentProps, props: any) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={width ?? (height ? height / 4 : 256)}
    height={height ?? (width ? width * 4 : 64)}
    viewBox="0 0 67.733334 16.933333"
    stroke={stroke ?? DEFAULT_STROKE}
    strokeWidth={strokeWidth ?? DEFAULT_STROKE_WIDTH}
    fill="none"
    alt="LogoTitle"
    {...props}
  >
    <Path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M3.81 1.891s1.864 13.052 5.593 13.052c1.865 0-.155-13.052 5.594-13.052M43.05 6.497l.249.315a.585.585 0 0 0 .92-.003l.204-.263m-29.975 2.67v3.15c0 2.25 1.642 2.827 2.845 2.468 4.219-1.26 6.36-12.71 3.594-12.71-4.897 0-1.757 14.167 2.898 12.642 2.402-.787.2-4.797.2-4.797s1.349.95 3.398.5c0 0 5.697 3.198 5.897-.25-.4-3.398-6.497-1.5-5.547 2.249.72 2.152 2.73 2.714 4.53 2.544 1.235-.117 3.19-.934 3.996-1.862 2.773-3.198 4.023-11.007 1.318-11.027-3.881-.028-1.67 12.828 2.748 12.843 2.95.01 3.027-3.226 3.436-4.248-1.292 5.191 4.61 6.047 4.66.35 1.118 2.982.863 1.684 1.25 3.898.243-4.566 4.047-4.598 4.097-2.699-1.2 3.798 1.87 2.705 3.019 1.955 1.886-.53 4.635-11.768 1.547-11.949-4.281.067-.24 12.586-.24 12.586s.722-3.395 5.841-5.041c-5.287 1.777-5.01 6.067-.226 4.916"
    />
  </Svg>
)

export const SettingsIcon = ({ height, width, stroke, strokeWidth }: SvgComponentProps, props: any) => (
    <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={width ?? height ?? DEFAULT_SIZE}
    height={height ?? width ?? DEFAULT_SIZE}
    viewBox="0 0 24 24"
    stroke={stroke ?? DEFAULT_STROKE}
    strokeWidth={strokeWidth ?? DEFAULT_STROKE_WIDTH}
    fill="none"
    alt="Settings"
    {...props}
  >
    <Path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.325.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 0 1 1.37.49l1.296 2.247a1.125 1.125 0 0 1-.26 1.431l-1.003.827c-.293.241-.438.613-.43.992a7.723 7.723 0 0 1 0 .255c-.008.378.137.75.43.991l1.004.827c.424.35.534.955.26 1.43l-1.298 2.247a1.125 1.125 0 0 1-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.47 6.47 0 0 1-.22.128c-.331.183-.581.495-.644.869l-.213 1.281c-.09.543-.56.94-1.11.94h-2.594c-.55 0-1.019-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 0 1-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 0 1-1.369-.49l-1.297-2.247a1.125 1.125 0 0 1 .26-1.431l1.004-.827c.292-.24.437-.613.43-.991a6.932 6.932 0 0 1 0-.255c.007-.38-.138-.751-.43-.992l-1.004-.827a1.125 1.125 0 0 1-.26-1.43l1.297-2.247a1.125 1.125 0 0 1 1.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.086.22-.128.332-.183.582-.495.644-.869l.214-1.28Z"
    />
    <Path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
    />
  </Svg>
)

export const AddIcon = ({ height, width, stroke, strokeWidth }: SvgComponentProps, props: any) => (
    <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={width ?? height ?? DEFAULT_SIZE}
    height={height ?? width ?? DEFAULT_SIZE}
    viewBox="0 0 24 24"
    stroke={stroke ?? DEFAULT_STROKE}
    strokeWidth={strokeWidth ?? DEFAULT_STROKE_WIDTH}
    fill="none"
    alt="Add"
    {...props}
  >
    <Path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M12 4.5v15m7.5-7.5h-15"
    />
  </Svg>
)

export const ChevronUpIcon = ({ height, width, stroke, strokeWidth }: SvgComponentProps, props: any) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={width ?? height ?? DEFAULT_SIZE}
    height={height ?? width ?? DEFAULT_SIZE}
    viewBox="0 0 24 24"
    stroke={stroke ?? DEFAULT_STROKE}
    strokeWidth={strokeWidth ?? DEFAULT_STROKE_WIDTH}
    fill="none"
    alt="Chevron Down"
    {...props}
  >
    <Path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="m4.5 15.75 7.5-7.5 7.5 7.5"
    />
  </Svg>
)

export const ChevronDownIcon = ({ height, width, stroke, strokeWidth }: SvgComponentProps, props: any) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={width ?? height ?? DEFAULT_SIZE}
    height={height ?? width ?? DEFAULT_SIZE}
    viewBox="0 0 24 24"
    stroke={stroke ?? DEFAULT_STROKE}
    strokeWidth={strokeWidth ?? DEFAULT_STROKE_WIDTH}
    fill="none"
    alt="Chevron Down"
    {...props}
  >
    <Path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="m19.5 8.25-7.5 7.5-7.5-7.5"
    />
  </Svg>
)

export const BackIcon = ({ height, width, stroke, strokeWidth }: SvgComponentProps, props: any) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={width ?? height ?? DEFAULT_SIZE}
    height={height ?? width ?? DEFAULT_SIZE}
    viewBox="0 0 24 24"
    stroke={stroke ?? DEFAULT_STROKE}
    strokeWidth={strokeWidth ?? DEFAULT_STROKE_WIDTH}
    fill="none"
    alt="Back"
    {...props}
  >
    <Path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M9 15L3 9m0 0l6-6M3 9h12a6 6 0 0 1 0 12h-3"
    />
  </Svg>
)

export const EditIcon = ({ height, width, stroke, strokeWidth }: SvgComponentProps, props: any) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={width ?? height ?? DEFAULT_SIZE}
    height={height ?? width ?? DEFAULT_SIZE}
    viewBox="0 0 24 24"
    stroke={stroke ?? DEFAULT_STROKE}
    strokeWidth={strokeWidth ?? DEFAULT_STROKE_WIDTH}
    fill="none"
    alt="Edit"
    {...props}
  >
    <Path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125"
    />
  </Svg>
)

export const CheckIcon = ({ height, width, stroke, strokeWidth }: SvgComponentProps, props: any) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={width ?? height ?? DEFAULT_SIZE}
    height={height ?? width ?? DEFAULT_SIZE}
    viewBox="0 0 24 24"
    stroke={stroke ?? DEFAULT_STROKE}
    strokeWidth={strokeWidth ?? DEFAULT_STROKE_WIDTH}
    fill="none"
    alt="Check"
    {...props}
  >
    <Path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="m4.5 12.75 6 6 9-13.5"
    />
  </Svg>
)

export const XMarkIcon = ({ height, width, stroke, strokeWidth }: SvgComponentProps, props: any) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={width ?? height ?? DEFAULT_SIZE}
    height={height ?? width ?? DEFAULT_SIZE}
    viewBox="0 0 24 24"
    stroke={stroke ?? DEFAULT_STROKE}
    strokeWidth={strokeWidth ?? DEFAULT_STROKE_WIDTH}
    fill="none"
    alt="X Mark"
    {...props}
  >
    <Path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M6 18 18 6M6 6l12 12"
    />
  </Svg>
)

export const TrashIcon = ({ height, width, stroke, strokeWidth }: SvgComponentProps, props: any) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={width ?? height ?? DEFAULT_SIZE}
    height={height ?? width ?? DEFAULT_SIZE}
    viewBox="0 0 24 24"
    stroke={stroke ?? DEFAULT_STROKE}
    strokeWidth={strokeWidth ?? DEFAULT_STROKE_WIDTH}
    fill="none"
    alt="Trash"
    {...props}
  >
    <Path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
    />
  </Svg>
)