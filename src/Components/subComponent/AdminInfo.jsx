import React from 'react'

export default function AdminInfo({ darkTheme, active, setActive }) {
    return (
        <div className='AdminInfo' style={{ borderColor: darkTheme ? "white" : "black", transform: active ? "translateX(0)" : "translateX(-100%)" }} >
            <div className='opener' style={{ borderColor: darkTheme ? "white" : "black" }} onClick={() => setActive((e) => !e)}>
                <img src={darkTheme ? "https://img.icons8.com/external-jumpicon-line-ayub-irawan/32/ffffff/external-dot-basic-ui-jumpicon-line-jumpicon-line-ayub-irawan-2.png" : "https://img.icons8.com/external-jumpicon-line-ayub-irawan/32/000000/external-dot-basic-ui-jumpicon-line-jumpicon-line-ayub-irawan-2.png"} alt="external-dot-basic-ui-jumpicon-line-jumpicon-line-ayub-irawan-2" />
            </div>

            <div className='admin-socials'>
                <a href="https://www.linkedin.com/in/kalash-bharti-31842a251/" target='blank'>
                    <img src="https://img.icons8.com/fluency/48/linkedin.png" alt="linkedin" />
                </a>

                <a href="https://github.com/KalashBharti" target='blank'>
                    <img src="https://img.icons8.com/3d-fluency/94/github.png" alt="github" />
                </a>
                <a href="https://instagram.com/kalashbharti26/" target='_blank'>
                    <img src="https://img.icons8.com/3d-fluency/94/instagram-new.png" alt="instagram-new" />
                </a>
            </div>
        </div>
    )
}
