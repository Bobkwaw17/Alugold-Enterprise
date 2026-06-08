import {useState} from 'react'
import BookingCalender from './calendar'
function ServicePill({ icon, label, checked = false }) {
	return (
		<label className="group relative cursor-pointer">
			<input className="peer sr-only" name="service" type="radio" defaultChecked={checked} />
			<div className="border border-[#d0c5af]/50 p-6 transition-all peer-checked:border-[#d4af37] peer-checked:bg-[#f3f3f4]">
				<div className="mb-2 text-[#5f5e5e] transition-colors group-hover:text-[#735c00]">{icon}</div>
				<div className="text-sm font-semibold text-[#1a1c1c]">{label}</div>
			</div>
			<div className="absolute right-2 top-2 opacity-0 transition-opacity peer-checked:opacity-100">
				<span className="text-xs font-bold text-[#735c00]">Selected</span>
			</div>
		</label>
	)
}

function TimeSlot({ slot, checked = false }) {
	return (
		<label className="block cursor-pointer">
			<input className="peer sr-only" name="time" type="radio" defaultChecked={checked} />
			<div className="flex items-center justify-between border border-[#d0c5af]/30 px-6 py-4 transition-all peer-checked:bg-[#0f0f0f] peer-checked:text-white">
				<span className="text-sm font-semibold">{slot}</span>
				<span className="text-xs uppercase tracking-[0.2em] opacity-50">Available</span>
			</div>
		</label>
	)
}

function SidebarPanel() {
	return (
		<div className="space-y-6 lg:col-span-4">
			<div className="bg-[#0f0f0f] p-8 text-white">
				<h3 className="mb-6 text-2xl font-semibold">Need Immediate Assistance?</h3>
				<div className="space-y-6">
					<div className="flex gap-4">
						<span className="text-[#d4af37]">phone_in_talk</span>
						<div>
							<div className="text-xs uppercase tracking-[0.2em] text-[#d0c5af]">Hotline</div>
							<div className="text-lg">+44 (0) 20 7946 0123</div>
						</div>
					</div>
					<div className="flex gap-4">
						<span className="text-[#d4af37]">mail</span>
						<div>
							<div className="text-xs uppercase tracking-[0.2em] text-[#d0c5af]">Email</div>
							<div className="text-lg">consult@alugold.com</div>
						</div>
					</div>
				</div>
			</div>

			<div className="border border-[#d0c5af]/30 bg-[#eeeeee] p-8">
				<span className="mb-4 block text-xs font-bold uppercase tracking-[0.24em] text-[#5f5e5e]">
					Our Commitment
				</span>
				<p className="text-sm italic leading-6 text-[#5f5e5e]">
					&quot;We provide a white-glove service from initial structural drafting to
					final facade polishing. Every booking is handled by a senior project
					manager.&quot;
				</p>
				<div className="mt-6 flex items-center gap-3">
					<div className="h-10 w-10 rounded-full bg-[#d0c5af]" />
					<div>
						<div className="text-sm font-semibold text-[#1a1c1c]">Marcus Vane</div>
						<div className="text-xs font-bold uppercase tracking-[0.2em] text-[#5f5e5e]">
							Director of Operations
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}

export default function BookingSection() {
	return (
		<section className="mx-auto max-w-7xl px-5 pb-20 lg:px-16">
			<div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:items-start">
				<div className="bg-white p-8 border border-[#d0c5af]/30 lg:col-span-8 lg:p-10">
					<div className="mb-10">
						<h2 className="mb-2 text-3xl font-semibold text-[#1a1c1c]">Schedule a Consultation</h2>
						<p className="text-[#5f5e5e]">Secure a session with our lead engineers to discuss your project requirements.</p>
					</div>

					<form className="space-y-10">
						<div>
							<span className="mb-6 block text-xs font-bold uppercase tracking-[0.24em] text-[#735c00]">01. Select Service Type</span>
							<div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
								<ServicePill checked icon="layers" label="Cladding" />
								<ServicePill icon="precision_manufacturing" label="Fabrication" />
								<ServicePill icon="grid_view" label="Curtain Walls" />
							</div>
						</div>

						<div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:gap-8">
							<div>
								<span className="mb-6 block text-xs font-bold uppercase tracking-[0.24em] text-[#735c00]">02. Preferred Date</span>
								<div className="border border-[#d0c5af]/30 bg-[#f3f3f4] p-4">
									<div className="mb-4 flex items-center justify-between">
										<span className="text-xl font-semibold text-[#1a1c1c]">November 2024</span>
										<div className="flex gap-2 text-[#5f5e5e]">
											<span>chevron_left</span>
											<span>chevron_right</span>
										</div>
									</div>
									<div className="mb-2 grid grid-cols-7 text-center text-[10px] font-bold uppercase tracking-[0.2em] text-[#5f5e5e]">
										<div>M</div><div>T</div><div>W</div><div>T</div><div>F</div><div>S</div><div>S</div>
									</div>
									<div className="grid grid-cols-7 gap-1 text-center text-sm text-[#1a1c1c]">
										<div className="p-2 text-[#d0c5af]">28</div><div className="p-2 text-[#d0c5af]">29</div><div className="p-2 text-[#d0c5af]">30</div><div className="p-2 text-[#d0c5af]">31</div>
										<div className="cursor-pointer p-2 transition-colors hover:bg-[#d4af37] hover:text-white">1</div><div className="cursor-pointer bg-[#d4af37] p-2 text-white">2</div><div className="p-2">3</div>
										<div className="cursor-pointer p-2 transition-colors hover:bg-[#d4af37] hover:text-white">4</div><div className="p-2">5</div><div className="p-2">6</div><div className="p-2">7</div><div className="p-2">8</div><div className="p-2">9</div><div className="p-2">10</div>
									</div>
								</div>
							</div>

							<div>
								<span className="mb-6 block text-xs font-bold uppercase tracking-[0.24em] text-[#735c00]">03. Time Slot</span>
								<div className="space-y-3">
									<TimeSlot checked slot="09:00 AM - 10:30 AM" />
									<TimeSlot slot="11:00 AM - 12:30 PM" />
									<TimeSlot slot="02:00 PM - 03:30 PM" />
								</div>
							</div>
						</div>

						<div>
							<span className="mb-6 block text-xs font-bold uppercase tracking-[0.24em] text-[#735c00]">04. Project Brief</span>
							<div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:gap-8">
								<div className="space-y-6">
									<div className="relative">
										<label className="absolute -top-2 left-3 bg-white px-1 text-[10px] font-bold uppercase tracking-[0.2em] text-[#5f5e5e]">Full Name</label>
										<input className="w-full border border-[#d0c5af]/50 p-4 outline-none transition-all focus:border-[#735c00]" placeholder="John Doe" type="text" />
									</div>
									<div className="relative">
										<label className="absolute -top-2 left-3 bg-white px-1 text-[10px] font-bold uppercase tracking-[0.2em] text-[#5f5e5e]">Email Address</label>
										<input className="w-full border border-[#d0c5af]/50 p-4 outline-none transition-all focus:border-[#735c00]" placeholder="corporate@entity.com" type="email" />
									</div>
								</div>
								<div className="relative">
									<label className="absolute -top-2 left-3 bg-white px-1 text-[10px] font-bold uppercase tracking-[0.2em] text-[#5f5e5e]">Project Description</label>
									<textarea className="min-h-[160px] w-full resize-none border border-[#d0c5af]/50 p-4 outline-none transition-all focus:border-[#735c00]" placeholder="Briefly describe your architectural requirements..." rows={4} />
								</div>
							</div>
						</div>

						<div className="flex justify-end border-t border-[#d0c5af]/30 pt-6">
							<button className="bg-[#d4af37] px-12 py-4 text-sm font-semibold uppercase tracking-[0.2em] text-white transition-all hover:bg-[#a68926]">
								Confirm Booking
							</button>
						</div>
					</form>
				</div>

				<SidebarPanel />
			</div>
		</section>
	)
}