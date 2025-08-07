import React from 'react';
import { motion } from 'framer-motion';

const BenefitsSection = ({ id, title, description, benefits, gradientClass }) => {
    const fadeIn = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
    };

    return (
        <section id={id} className={`py-24 ${id === 'clientes' ? 'bg-[#0c1432]' : 'bg-[#0a102a]'}`}>
            <div className="container mx-auto px-4 sm:px-6">
                <h2 className="text-4xl font-bold text-center mb-4"><span className={gradientClass}>{title}</span></h2>
                <p className="text-lg text-center text-slate-400 mb-12">{description}</p>
                <div className={`grid grid-cols-1 sm:grid-cols-2 ${id === 'clientes' ? 'lg:grid-cols-5' : id === 'transportadores' ? 'lg:grid-cols-3' : 'lg:grid-cols-3'} gap-8`}>
                    {benefits.map((benefit, index) => (
                        <motion.div key={index} variants={fadeIn} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }}>
                            <div className="glass-card p-6 rounded-xl h-full text-center flex flex-col items-center">
                                <div className="mb-4">{benefit.icon}</div>
                                <h3 className="text-xl font-bold text-white mb-2">{benefit.title}</h3>
                                <p className="text-slate-400 flex-grow text-sm">{benefit.description}</p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default BenefitsSection;