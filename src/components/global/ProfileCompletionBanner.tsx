import { useSelector } from "react-redux";

function ProfileCompletionBanner() {
    const { user } = useSelector((store: any) => store.auth);

    const profileFields = [
        user?.fullName,
        user?.email,
        user?.phoneNumber,
        user?.profile?.bio,
        user?.profile?.skills && user.profile.skills.length > 0,
        user?.profile?.resume,
        user?.profile?.profilePhoto,
    ];
    const filledFields = profileFields.filter(Boolean).length;
    const totalFields = profileFields.length;
    const completion = Math.round((filledFields / totalFields) * 100);

    if (completion === 100) return null;

    return (
        <div className="fixed top-14 right-2 z-50 bg-yellow-100 border border-yellow-400 rounded-xl w-80 h-44 p-5 shadow-2xl flex flex-col justify-between">
            <div className="flex flex-col gap-2 overflow-hidden">
                <span className="text-yellow-800 font-bold text-lg">
                    Profile {completion}% Complete 🎉
                </span>
                <p className="text-yellow-800 text-sm leading-snug">
                    Complete your profile to get the best job matches and recommendations.
                </p>
            </div>

            <a
                href="/profile"
                className="mt-3 text-center bg-yellow-500 text-white font-semibold py-2 rounded-lg hover:bg-yellow-600 transition"
            >
                Complete Profile
            </a>
        </div>
    );
}

export default ProfileCompletionBanner;
