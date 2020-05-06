import React, { Fragment, useEffect } from 'react'
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Spinner from '../layout/Spinner';
import ProfileTop from './ProfileTop';
import ProfileAbout from './ProfileAbout';
import ProfileExperience from './ProfileExperience';
import ProfileEducation from './ProfileEducation';
import ProfileGithub from './ProfileGithub';
import { getProfileById } from '../../actions/profile';

const Profile = ({ getProfileById, profile: { profile }, auth, match }) => {
    /*
     use a nullProfile boolean to safely add to useEffect
     adding profile to useEffect would trigger the function
     as profile is an object and object's are reference types
  */
    const nullProfile = !profile;
    useEffect(() => {
      getProfileById(match.params.id);
    }, [getProfileById, match.params.id, nullProfile]);

    return (
        <Fragment>
            {profile === null ? (
                <Spinner />
            ) : (
                <Fragment>
                <Link to='/profiles' className='btn btn-light'>
                    Back to Profiles
                </Link>
                {auth.isAuthenticated && auth.loading === false && auth.user._id === profile.user._id && (<Link to ='/edit-profile' className='btn btn-daark'>Edit Profile</Link>)}
                <div className="profile-grid my-1">
                    <ProfileTop profile={profile} />
                    <ProfileAbout profile={profile} />
                    <div className="profile-exp bg-white p-2">
                    <h2 className="text-primary">Experience</h2>
                    {profile.experience.length > 0 ? (
                        <Fragment>
                            {profile.experience.map(experience => (
                                <ProfileExperience 
                                    key={experience._id} experience={experience}
                                />
                            ))}
                        </Fragment>
                    ) : (<h4>No experience credntials</h4>)}
                    </div>
                    <div className="profile-edu bg-white p-2">
                    <h2 className="text-primary">Education</h2>
                    {profile.education.length > 0 ? (
                        <Fragment>
                            {profile.education.map(education => (
                                <ProfileEducation 
                                    key={education._id} education={education}
                                />
                            ))}
                        </Fragment>
                    ) : (<h4>No education credntials</h4>)}
                    </div>
                    {profile.githubusername && (
                        <ProfileGithub username={profile.githubusername}/>
                    )}
                </div>
            </Fragment>
            )}
        </Fragment>
    );
}

Profile.propTypes = {
    profile:PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired,
    getProfileById: PropTypes.func.isRequired,
}

const mapStateToProps = state => ({
    profile: state.profile,
    auth: state.auth
})

export default connect(mapStateToProps, {getProfileById})(Profile);
