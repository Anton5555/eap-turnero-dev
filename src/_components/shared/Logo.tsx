import React from "react";

interface LogoProps {
  width?: number;
  height?: number;
}

const Logo: React.FC<LogoProps> = ({ width = 68, height = 34 }) => (
  <svg
    width={width}
    height={height}
    viewBox="0 0 68 34"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g clipPath="url(#clip0_332_869)">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M45.1958 5.3372C45.0269 5.34146 44.8793 5.22224 44.8793 5.05193V1.49241C44.8793 1.31358 45.0213 1.2341 45.0965 1.21423C45.7976 1.03824 46.608 0.958761 47.3914 0.988565C49.2564 1.05953 51.0304 1.7791 51.7642 3.6284C53.1906 2.00192 55.037 1.14468 57.2071 0.911925C62.755 0.318671 66.878 3.76607 67.3875 9.40766C67.9524 15.6496 64.2211 20.8285 57.7918 20.8115C55.7836 20.8058 54.2195 20.319 52.4015 19.5356V32.6042C52.4015 32.7617 52.2737 32.8909 52.1148 32.8909H47.8343C47.6753 32.8909 47.5476 32.7631 47.5476 32.6042V8.23109C47.5476 7.46043 47.5405 6.53648 47.3219 5.86375C47.1402 5.30598 46.3951 5.30314 45.8941 5.31733L45.193 5.3372H45.1958ZM41.0104 2.51002C41.1282 2.5526 41.2205 2.65479 41.2205 2.78678V13.3433C41.2205 13.9309 41.2205 14.6504 41.2815 15.2323C41.4163 16.4884 42.0578 16.4643 43.172 16.4416L43.6034 16.433C43.7624 16.4302 43.8901 16.5622 43.8901 16.7197V20.2793C43.8901 20.4113 43.7979 20.529 43.6644 20.5589C42.996 20.705 42.3176 20.7916 41.632 20.7874C39.6834 20.7746 37.7731 20.072 37.0024 18.1475C35.305 20.0295 33.1959 20.8796 30.6781 20.9094C24.9102 20.9775 21.4997 17.0121 21.433 11.4401C21.3961 8.22967 22.3598 5.33294 24.9698 3.2892C27.0817 1.63291 29.9046 0.877862 32.746 0.927537C35.9294 0.982888 38.0285 1.43138 41.009 2.5086L41.0104 2.51002ZM36.4262 11.0015V5.59835C35.278 5.34714 34.1454 5.18392 32.966 5.18534C31.2061 5.18534 29.1425 5.54725 27.8453 6.83453C26.9142 7.75705 26.3721 9.27709 26.294 10.8454C26.1336 14.0799 27.7644 16.5806 31.1493 16.6587C34.6109 16.7382 36.4248 14.2474 36.4248 11.0001L36.4262 11.0015ZM18.9521 8.48372C18.9791 9.46443 18.8911 10.5473 18.6683 11.7381C18.6513 11.8275 18.5931 11.907 18.5037 11.9467C17.1823 12.54 14.859 13.1503 11.9878 13.3603C9.9256 13.5108 7.57529 13.4554 5.10151 13.041C5.83953 15.8142 8.34453 16.7268 10.9886 16.741C12.899 16.7524 15.3089 16.0938 17.0773 15.326C17.2249 15.2621 17.3938 15.3317 17.4548 15.4836L18.7563 18.7067C18.8159 18.8529 18.7563 19.0161 18.6129 19.0857C16.0057 20.3516 13.6271 20.8966 10.7559 20.9307C4.10802 21.0059 -0.72175 16.609 0.0900709 9.62197C0.727322 4.13224 4.82759 0.887797 10.1896 0.740193C15.1925 0.601105 18.8045 3.18417 18.9521 8.48372ZM10.0179 9.59075C11.6131 9.54391 13.1488 9.31257 14.6489 8.89531C14.815 5.90349 13.0423 4.89297 10.3003 5.00084C7.55826 5.1087 5.68483 6.4641 5.08306 9.18342C6.80321 9.50134 8.44104 9.63617 10.0193 9.59075H10.0179ZM52.4015 11.4216L52.4355 15.1642C53.8151 15.8795 54.9987 16.4856 57.3859 16.5182C60.7113 16.5636 62.5024 14.0316 62.5663 10.8695C62.6216 8.10194 61.3954 5.70195 58.4731 5.1967C56.3144 4.82343 54.0464 5.70337 53.0628 7.7017C52.4611 8.92369 52.3901 10.0918 52.4029 11.4216H52.4015Z"
        fill="#039C7D"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M3.78226 24.1345H2.70361V33.1199H8.01735V32.1576H3.78226V24.1345ZM15.7424 27.3818C14.9718 27.0355 14.1245 26.8169 13.2644 26.8042C11.249 26.8042 9.84963 27.9339 9.81131 29.962C9.81131 31.6822 10.7353 33.2093 12.6229 33.2093C13.6107 33.2093 14.5361 32.7594 14.9079 31.8227V32.0413C14.9079 33.0163 15.5239 33.2604 16.4861 33.0944V32.3365C15.741 32.4003 15.741 32.054 15.741 31.4381V27.3818H15.7424ZM14.7674 29.962C14.7674 31.3231 14.0748 32.2854 12.8159 32.2854C11.557 32.2854 10.8261 31.2592 10.8261 29.962C10.8644 28.4605 11.8011 27.6259 13.2005 27.6259C13.6746 27.6259 14.2536 27.7409 14.766 27.985V29.962H14.7674ZM20.5268 25.0329H19.6923L19.5886 26.9589H18.202V27.6259L19.5234 27.6898V30.7441C19.5234 33.0802 20.9866 33.6834 23.1056 33.0035L22.9892 32.1945C21.5004 32.7466 20.5254 32.2967 20.5254 30.7185V27.6898H22.7976V26.9574H20.5254V25.0315L20.5268 25.0329ZM25.182 24.891C25.182 25.3281 25.5155 25.5453 25.8363 25.5325C26.1442 25.5197 26.4522 25.3139 26.4522 24.891C26.4522 24.468 26.1442 24.2623 25.8235 24.2623C25.5027 24.2623 25.182 24.468 25.182 24.891ZM26.3117 26.983H25.3097V33.1185H26.3117V26.983ZM28.7089 27.5479C29.5306 27.4457 29.4795 27.7537 29.4795 28.6904V33.1185H30.4943V29.4852C30.4943 28.3427 31.2905 27.6245 32.3166 27.6245C33.3428 27.6245 34.0623 28.3427 34.0623 29.4341V31.783C34.0623 33.066 34.7166 33.3356 35.8464 33.1185V32.4117C35.1793 32.5011 35.0885 32.284 35.0757 31.7574V29.4341C35.0757 27.9325 34.2156 26.8027 32.5849 26.8027C31.6609 26.8027 30.8136 27.1107 30.4162 27.9708C30.4162 27.0085 29.7095 26.6495 28.6961 26.8922L28.7089 27.5464V27.5479ZM43.6339 27.3804C42.8632 27.0341 42.0159 26.8155 41.1559 26.8027C39.1405 26.8027 37.7411 27.9325 37.7028 29.9606C37.7028 31.6808 38.6267 33.2079 40.5143 33.2079C41.5022 33.2079 42.4275 32.758 42.7994 31.8213V32.0398C42.7994 33.0149 43.4153 33.259 44.3776 33.0929V32.3351C43.6339 32.3989 43.6339 32.0526 43.6339 31.4367V27.3804ZM42.6574 29.9606C42.6574 31.3217 41.9648 32.284 40.7059 32.284C39.4471 32.284 38.7161 31.2578 38.7161 29.9606C38.7545 28.459 39.6912 27.6245 41.0906 27.6245C41.566 27.6245 42.1437 27.7395 42.656 27.9836V29.9606H42.6574Z"
        fill="#039C7D"
      />
    </g>
    <defs>
      <clipPath id="clip0_332_869">
        <rect
          width="67.4436"
          height="32.5325"
          fill="white"
          transform="translate(0 0.733887)"
        />
      </clipPath>
    </defs>
  </svg>
);

export default Logo;
