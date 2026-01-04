import React from "react";

export default function About() {
  return (
    <>
      <div className="pt-20" id="about">
        <div className="container">
          <div className="font-semibold text-center">
            <h3 className="text-primary text-5xl">About</h3>
          </div>
          <div className="mt-10">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
              <img
                src="/images/about.png"
                alt="about.png"
                className="w-full h-full bg-contain"
              />
              <div className="flex flex-col justify-between gap-4">
                <p>
                  The Laguna Lake Development Authority (LLDA) is a government
                  agency in the Philippines responsible for the sustainable
                  development, protection, and management of Laguna Lake, the
                  country’s largest freshwater lake. Established under Republic
                  Act No. 4850, LLDA plays a vital role in environmental
                  conservation, water resource management, and pollution control
                  within the Laguna de Bay region.
                </p>
                <p>
                  LLDA conducts regular water quality monitoring across Laguna
                  Lake and its tributaries to assess the lake’s ecological
                  condition. These monitoring activities involve measuring key
                  environmental parameters such as dissolved oxygen, pH level,
                  biochemical oxygen demand (BOD), chemical oxygen demand (COD),
                  turbidity, temperature, and nutrient levels. The collected
                  data helps guide policy decisions, environmental regulations,
                  and rehabilitation programs.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
