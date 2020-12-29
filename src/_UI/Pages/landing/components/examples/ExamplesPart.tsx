import React from "react";
import {
    BlockSubTitle, BlocksWrapper,
    BlockTitle,
    BookBlock,
    ExamplesInner,
    ExamplesOuter, ImageWrap,
    LeftArrow,
    LeftMap,
    RightMap,
    SearchBlock, SupportBlock,
    UnderArrow,
    UpperArrow
} from "./exmaples-styles";
import left_map_img from '../../../../assets/icons/landing/left_map.png'
import right_map_img from '../../../../assets/icons/landing/right_map.png'
import left_arrow from '../../../../assets/icons/landing/left_arrow.svg'
import upper_arrow from '../../../../assets/icons/landing/upper_arrow.svg'
import under_arrow from '../../../../assets/icons/landing/under_arrow.svg'
import first_example_img from '../../../../assets/icons/landing/first_landing.svg'
import middle_example_img from '../../../../assets/icons/landing/middle_landing.svg'
import final_example_img from '../../../../assets/icons/landing/final_landing.svg'



const ExamplesPart: React.FC = () => {
    return (
        <ExamplesOuter>
            <ExamplesInner>
                <LeftMap>
                    <img src={left_map_img} alt=""/>
                </LeftMap>
                <LeftArrow>
                    <img src={left_arrow} alt=""/>
                </LeftArrow>
                <RightMap>
                    <img src={right_map_img} alt=""/>
                </RightMap>
                <BlocksWrapper>
                    <SearchBlock>
                        <BlockTitle>
                            Search and compare <br/> freight from local agents
                        </BlockTitle>
                        <BlockSubTitle>
                            FCL, LCL, Loose Cargo/RORO, Air Cargo modes supported.
                        </BlockSubTitle>
                        <ImageWrap>
                            <img src={first_example_img} alt=""/>
                        </ImageWrap>
                    </SearchBlock>
                    <div style={{display: 'flex', alignItems: 'flex-start', height: '100%', position: 'relative'}}>
                        <UpperArrow>
                            <img src={upper_arrow} alt=""/>
                        </UpperArrow>
                        <UnderArrow>
                            <img src={under_arrow} alt=""/>
                        </UnderArrow>
                        <BookBlock>
                            <BlockTitle>
                                Book and track <br/> your shipments
                            </BlockTitle>
                            <BlockSubTitle>
                                See their position on the map and review <br/>
                                their milestones.
                            </BlockSubTitle>
                            <ImageWrap>
                                <img src={middle_example_img} alt=""/>
                            </ImageWrap>
                        </BookBlock>
                        <SupportBlock>
                            <BlockTitle>
                                Stay in touch with the <br/> agent or request help <br/> from our team
                            </BlockTitle>
                            <BlockSubTitle>
                                With a chat based support feature.
                            </BlockSubTitle>
                            <ImageWrap height='230px' width='414px'>
                                <img src={final_example_img} alt=""/>
                            </ImageWrap>
                        </SupportBlock>
                    </div>
                </BlocksWrapper>
            </ExamplesInner>

        </ExamplesOuter>
    )
}

export default ExamplesPart