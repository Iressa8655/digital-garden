# -------------------------------------------------------------------------- #
# Pre-surgery metabolic cost of transport                                     #
# Model:    subject_walk_armless.osim                                         #
# Solution: solution_baseline.sto  (used as initial guess)                   #
# -------------------------------------------------------------------------- #

import opensim as osim
import re
import math

track = osim.MocoTrack()
track.setName('presurg_metabolics')

# All 80 muscles confirmed from subject_walk_armless.osim
muscle_names = [
    'addbrev_r','addlong_r','addmagDist_r','addmagIsch_r','addmagMid_r','addmagProx_r',
    'bflh_r','bfsh_r','edl_r','ehl_r','fdl_r','fhl_r',
    'gaslat_r','gasmed_r',
    'glmax1_r','glmax2_r','glmax3_r',
    'glmed1_r','glmed2_r','glmed3_r',
    'glmin1_r','glmin2_r','glmin3_r',
    'grac_r','iliacus_r',
    'perbrev_r','perlong_r','piri_r','psoas_r',
    'recfem_r','sart_r','semimem_r','semiten_r',
    'soleus_r','tfl_r','tibant_r','tibpost_r',
    'vasint_r','vaslat_r','vasmed_r',
    'addbrev_l','addlong_l','addmagDist_l','addmagIsch_l','addmagMid_l','addmagProx_l',
    'bflh_l','bfsh_l','edl_l','ehl_l','fdl_l','fhl_l',
    'gaslat_l','gasmed_l',
    'glmax1_l','glmax2_l','glmax3_l',
    'glmed1_l','glmed2_l','glmed3_l',
    'glmin1_l','glmin2_l','glmin3_l',
    'grac_l','iliacus_l',
    'perbrev_l','perlong_l','piri_l','psoas_l',
    'recfem_l','sart_l','semimem_l','semiten_l',
    'soleus_l','tfl_l','tibant_l','tibpost_l',
    'vasint_l','vaslat_l','vasmed_l',
]

# ── 1. PROCESS MODEL FIRST (replace Millard → DeGrooteFregly) ───────────────
# Must do this before adding metabolics so muscle types are correct
modelProcessor = osim.ModelProcessor(
    r'C:\OpenSim 4.5\Resources\Code\Python\Moco\tib_post surg\presurg\subject_walk_armless.osim')
modelProcessor.append(osim.ModOpReplaceMusclesWithDeGrooteFregly2016())
modelProcessor.append(osim.ModOpIgnoreTendonCompliance())
modelProcessor.append(osim.ModOpIgnorePassiveFiberForcesDGF())

model = modelProcessor.process()
model.initSystem()

# ── 2. ADD METABOLICS TO PROCESSED MODEL ────────────────────────────────────
metabolics = osim.Bhargava2004SmoothedMuscleMetabolics()
metabolics.setName('metabolic_cost')
metabolics.set_use_smoothing(True)

for name in muscle_names:
    metabolics.addMuscle(name,
        osim.Muscle.safeDownCast(model.getComponent('/forceset/' + name)))

model.addComponent(metabolics)
model.finalizeConnections()

# ── 3. PASS UPDATED MODEL BACK TO TRACK ─────────────────────────────────────
modelProcessor2 = osim.ModelProcessor(model)
track.setModel(modelProcessor2)

# ── 4. REFERENCE COORDINATES ─────────────────────────────────────────────────
tableProcessor = osim.TableProcessor(
    r'C:\OpenSim 4.5\Resources\Code\Python\Moco\tib_post surg\presurg\solution_baseline.sto')
tableProcessor.append(osim.TabOpLowPassFilter(6))
track.setStatesReference(tableProcessor)

track.set_states_global_tracking_weight(30)
track.set_allow_unused_references(True)
track.set_track_reference_position_derivatives(True)
track.set_apply_tracked_states_to_guess(True)
track.set_initial_time(0.81)
track.set_final_time(1.79)

study = track.initialize()
problem = study.updProblem()

# ── 5. SYMMETRY GOAL ──────────────────────────────────────────────────────────
symmetryGoal = osim.MocoPeriodicityGoal('symmetryGoal')
problem.addGoal(symmetryGoal)

# Re-process to get state variable names after DeGrooteFregly conversion
model2 = modelProcessor2.process()
model2.initSystem()

for i in range(model2.getNumStateVariables()):
    currentStateName = model2.getStateVariableNames().getitem(i)
    if currentStateName.startswith('/jointset'):
        if '_r' in currentStateName:
            symmetryGoal.addStatePair(osim.MocoPeriodicityGoalPair(
                currentStateName, re.sub(r'_r', '_l', currentStateName)))
        if '_l' in currentStateName:
            symmetryGoal.addStatePair(osim.MocoPeriodicityGoalPair(
                currentStateName, re.sub(r'_l', '_r', currentStateName)))
        if not ('_r' in currentStateName or '_l' in currentStateName
                or 'pelvis_tx/value' in currentStateName
                or '/activation' in currentStateName):
            symmetryGoal.addStatePair(osim.MocoPeriodicityGoalPair(currentStateName))

for i in range(model2.getNumStateVariables()):
    currentStateName = model2.getStateVariableNames().getitem(i)
    if currentStateName.endswith('/activation'):
        if '_r' in currentStateName:
            symmetryGoal.addStatePair(osim.MocoPeriodicityGoalPair(
                currentStateName, re.sub(r'_r', '_l', currentStateName)))
        if '_l' in currentStateName:
            symmetryGoal.addStatePair(osim.MocoPeriodicityGoalPair(
                currentStateName, re.sub(r'_l', '_r', currentStateName)))

# Pelvis residual actuators (no lumbar in this model)
symmetryGoal.addControlPair(osim.MocoPeriodicityGoalPair('/forceset/tau_pelvis_tilt'))
symmetryGoal.addControlPair(osim.MocoPeriodicityGoalPair('/forceset/tau_pelvis_list'))
symmetryGoal.addControlPair(osim.MocoPeriodicityGoalPair('/forceset/tau_pelvis_rotation'))

# ── 6. EFFORT + METABOLICS GOALS ─────────────────────────────────────────────
effort = osim.MocoControlGoal.safeDownCast(problem.updGoal('control_effort'))
effort.setWeight(0.1)

metGoal = osim.MocoOutputGoal('met', 0.1)
problem.addGoal(metGoal)
metGoal.setOutputPath('/metabolic_cost|total_metabolic_rate')
metGoal.setDivideByDisplacement(True)
metGoal.setDivideByMass(True)

# ── 7. BOUNDS ─────────────────────────────────────────────────────────────────
problem.setStateInfo('/jointset/ground_pelvis/pelvis_tilt/value',  [-20*math.pi/180, 20*math.pi/180])
problem.setStateInfo('/jointset/ground_pelvis/pelvis_tx/value',    [0, 2])
problem.setStateInfo('/jointset/ground_pelvis/pelvis_ty/value',    [0.7, 1.3])
problem.setStateInfo('/jointset/hip_r/hip_flexion_r/value',        [-30*math.pi/180, 80*math.pi/180])
problem.setStateInfo('/jointset/hip_l/hip_flexion_l/value',        [-30*math.pi/180, 80*math.pi/180])
problem.setStateInfo('/jointset/walker_knee_r/knee_angle_r/value', [-120*math.pi/180, 0])
problem.setStateInfo('/jointset/walker_knee_l/knee_angle_l/value', [-120*math.pi/180, 0])
problem.setStateInfo('/jointset/ankle_r/ankle_angle_r/value',      [-30*math.pi/180, 30*math.pi/180])
problem.setStateInfo('/jointset/ankle_l/ankle_angle_l/value',      [-30*math.pi/180, 30*math.pi/180])

# ── 8. SOLVER ─────────────────────────────────────────────────────────────────
solver = osim.MocoCasADiSolver.safeDownCast(study.updSolver())
solver.resetProblem(problem)
solver.set_num_mesh_intervals(50)
solver.set_verbosity(2)
solver.set_optim_solver('ipopt')
solver.set_optim_convergence_tolerance(1e-4)
solver.set_optim_constraint_tolerance(1e-4)
solver.set_optim_max_iterations(10000)

# Existing solution as initial guess — speeds up convergence significantly
solver.setGuessFile(
    r'C:\OpenSim 4.5\Resources\Code\Python\Moco\tib_post surg\presurg\solution_baseline.sto')

# ── 9. SOLVE ──────────────────────────────────────────────────────────────────
solution = study.solve()

fullStride = osim.createPeriodicTrajectory(solution)
fullStride.write(
    r'C:\OpenSim 4.5\Resources\Code\Python\Moco\tib_post surg\presurg\presurg_fullcycle.sto')

print()
print(f'PRE-SURG metabolic cost of transport: {10*solution.getObjectiveTerm("met"):.3f} J/kg/m')
print()

study.visualize(fullStride)
