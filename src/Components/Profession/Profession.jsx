


    const professions = [
      { icon: '/developer.png', heading: 'Developers' },
      { icon: '/professional.png', heading: 'Corporate Professionals' },
      { icon: '/banker.png', heading: 'Bankers' },
      { icon: '/hr.png', heading: 'HR' },
      { icon: '/designer.png', heading: 'Designer' },
      { icon: '/engineer.png', heading: 'Engineer' },
      
    ]

const Profession = () => {
    return (
        <div className="text-center text-[#353f58] mt-20">
            <h1 className='text-3xl font-bold text-blue-500'>Discover Who Benefits Most from Our Platform</h1>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-7xl mx-auto mt-10">
                    {
                        professions.map((profession,idx) => <div key={idx} className="hero text-start shadow-lg rounded-lg bg-white ">
                            <div className="hero-content flex-col items-center justify center mx-auto">
                                <div>
                                <img src={profession.icon} className="w-24 flex justify-center mx-auto" />
                                </div>
                                <div>
                                    <h1 className="text-xl font-bold">{profession.heading}</h1>
                                </div>
                            </div>
                        </div>)
                    }
                </div>
        </div>
    );
};

export default Profession;