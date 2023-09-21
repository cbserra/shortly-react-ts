import { useEffect, useState } from 'react'
import './ShortenSection.css'
import { DeviceType, ShortenResult } from '../../types/ShortenTypes';
import ShortenForm from './ShortenForm';
import ShortenResultList from './results/ShortenResultList';

type Props = {
    currentDeviceType?: DeviceType
    setCurrentDeviceType?: React.Dispatch<React.SetStateAction<DeviceType>>
    isMobile: boolean
    // setIsMobile: (value: React.SetStateAction<boolean>) => void
    isDesktop: boolean
    // setIsDesktop: (value: React.SetStateAction<boolean>) => void
}

const ShortenSection = (props: Props) => {
    // const {currentDeviceType, setCurrentDeviceType} = props
    const {isMobile, isDesktop} = props
    // const {, setIsDesktop} = props
    const [shortenResponses, setShortenResponses] = useState<ShortenResult[]>([])
    const [shortenResultCards, setShortenResultCards] = useState<JSX.Element[]>([])

    // useEffect(() => {
    //     console.log(`🚀 ~ ShortenForm ~ useEffect ~ props.currentDeviceType:`, props.currentDeviceType)
    //     setCurrentDeviceType(props.currentDeviceType)
    // }, [props.currentDeviceType, setCurrentDeviceType])

    // useEffect(() => {
    //     console.log(`🚀 ~ ShortenSection ~ useEffect ~ currentDeviceType:`, currentDeviceType)
    // }, [currentDeviceType])

    // useEffect(() => {
    //     console.log(`🚀 ~ useEffect ~ props.isDesktop:`, props.isDesktop)
    //     console.log(`🚀 ~ useEffect ~ props.isMobile:`, props.isMobile)

    //     // setIsDesktop(props.isDesktop)
    //     // setIsMobile(props.isMobile)
    // }, [props.isDesktop, props.isMobile])

    // useEffect(() => {
    //     console.log(`🚀 ~ useEffect ~ isDesktop:`, isDesktop)
    //     console.log(`🚀 ~ useEffect ~ isMobile:`, isMobile)

    //     setIsDesktop(isDesktop)
    //     setIsMobile(isMobile)
    // }, [isDesktop, isMobile, setIsDesktop, setIsMobile])

    // const formMethods = useForm<FormValues>({
    //     reValidateMode: 'onSubmit',
    //     mode: 'onSubmit',
    // })

    // const {
    //     register,
    //     handleSubmit,
    //     setError,
    //     formState,
    // } = formMethods

    return (
        // <FormProvider {...formMethods}>
            <div className='shorten-section-container'>
                <div className="shorten-url-container">
                    <ShortenForm 
                        // setCurrentDeviceType={setCurrentDeviceType}
                        // currentDeviceType={currentDeviceType}
                        isMobile={isMobile} 
                        // setIsMobile={setIsMobile}
                        isDesktop={isDesktop}
                        // setIsDesktop={setIsDesktop}
                        // shortenResultCards={shortenResultCards}
                        // setShortenResultCardsFun={setShortenResultCards}
                        shortenResponses={shortenResponses}
                        setShortenResponses={setShortenResponses}
                    />
                </div>
                <ShortenResultList
                    setShortenResponses={setShortenResponses}
                    shortenResponses={shortenResponses}
                    setShortenResultCards={setShortenResultCards}
                    shortenResultCards={shortenResultCards}
                />
            </div>
        // </FormProvider>
    )
}

export default ShortenSection