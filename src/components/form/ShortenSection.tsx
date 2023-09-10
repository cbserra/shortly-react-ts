import { useEffect, useState } from 'react'
import './ShortenSection.css'
import { DeviceType, PartialShortenResult, ShortenResult } from '../../types/ShortenTypes';
import ShortenForm from './ShortenForm';
import ShortenResultList from './results/ShortenResultList';
import { FormProvider, useForm } from 'react-hook-form';

type Props = {
    currentDeviceType: DeviceType
    setCurrentDeviceType: React.Dispatch<React.SetStateAction<DeviceType>>
    isMobile: boolean
    setIsMobile: (value: React.SetStateAction<boolean>) => void
    isDesktop: boolean
    setIsDesktop: (value: React.SetStateAction<boolean>) => void
}

const ShortenSection = (props: Props) => {
    const {currentDeviceType, setCurrentDeviceType} = props
    const {isMobile, setIsMobile} = props
    const {isDesktop, setIsDesktop} = props
    const [shortenResponses, setShortenResponses] = useState<PartialShortenResult[]>([])
    const [shortenResultCards, setShortenResultCards] = useState<JSX.Element[]>([])

    useEffect(() => {
        console.log(`🚀 ~ ShortenForm ~ useEffect ~ props.currentDeviceType:`, props.currentDeviceType)
        setCurrentDeviceType(props.currentDeviceType)
    }, [props.currentDeviceType, setCurrentDeviceType])

    useEffect(() => {
        console.log(`🚀 ~ ShortenSection ~ useEffect ~ currentDeviceType:`, currentDeviceType)
    }, [currentDeviceType])

    useEffect(() => {
        console.log(`🚀 ~ useEffect ~ props.isDesktop:`, props.isDesktop)
        console.log(`🚀 ~ useEffect ~ props.isMobile:`, props.isMobile)

        setIsDesktop(props.isDesktop)
        setIsMobile(props.isMobile)
    }, [props.isDesktop, props.isMobile, setIsDesktop, setIsMobile])

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
                        setCurrentDeviceType={setCurrentDeviceType}
                        currentDeviceType={currentDeviceType}
                        isMobile={isMobile} 
                        setIsMobile={setIsMobile}
                        isDesktop={isDesktop}
                        setIsDesktop={setIsDesktop}
                        // shortenResultCards={shortenResultCards}
                        // setShortenResultCardsFun={setShortenResultCards}
                        shortenResponses={shortenResponses}
                        setShortenResponsesFun={setShortenResponses}
                    />
                </div>
                <ShortenResultList
                    setShortenResponsesFun={setShortenResponses}
                    shortenResponses={shortenResponses}
                    setShortenResultCardsFun={setShortenResultCards}
                    shortenResultCards={shortenResultCards}
                />
            </div>
        // </FormProvider>
    )
}

export default ShortenSection